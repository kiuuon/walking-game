import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native'
import * as Location from 'expo-location';
import WebView from 'react-native-webview';
import { useRouter } from "expo-router";
import env from '../../environment';

const App = () => {
  const webViewRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [monsterPosition, setMonsterPosition] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const generateFixedRadiusPosition = (centerLat, centerLng, radius) => {
    const randomAngle = Math.random() * 2 * Math.PI;

    const offsetLat = radius * Math.cos(randomAngle);
    const offsetLng = radius * Math.sin(randomAngle) / Math.cos(centerLat * (Math.PI / 180));

    return {
      latitude: centerLat + offsetLat,
      longitude: centerLng + offsetLng,
    };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    let timerInterval;
    (async () => {

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('위치 접근 권한이 필요합니다.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const monsterInitialPosition = generateFixedRadiusPosition(latitude, longitude, 0.005);

      setCurrentPosition({ latitude, longitude });
      setMonsterPosition(monsterInitialPosition);

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (location) => {
          const { latitude, longitude } = location.coords;
          setCurrentPosition({ latitude, longitude });

          // WebView에 위치 업데이트 전달
          if (webViewRef.current) {
            webViewRef.current.injectJavaScript(`
              if (window.updatePosition) {
                window.updatePosition(${latitude}, ${longitude});
              }
            `);
          }
        }
      );

      timerInterval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            if (!gameOver) {
              setGameWon(true);
              Alert.alert(
                "You Win!",
                "몬스터에게서 살아남았습니다!",
                [
                  {
                    text: "OK",
                    onPress: () => router.push('/main'),
                  },
                ]
              );
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    })();

    return () => clearInterval(timerInterval);
  }, []);

  const html = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${env.KAKAO_JS_KEY}&libraries=services,clusterer,drawing"></script> 
        <style>
        html, body, #map {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
        </style>
    </head>
    <body >
        <div id="map"></div>
        <script>
          let map, marker, monsterMarker;
          
          window.setInitialPosition = (currentLatitude, currentLongitude, monsterLatitude, monsterLongitude) => {
            const container = document.getElementById('map');
            const options = {
              center: new kakao.maps.LatLng(currentLatitude, currentLongitude),
              level: 4,
            };
            map = new kakao.maps.Map(container, options);
            
            const imageSrc = "https://cdn-icons-png.flaticon.com/128/11383/11383207.png"; // 팩맨 아이콘 제작자: Creative Squad - Flaticon
            const imageSize = new kakao.maps.Size(40, 40);
            const imageOption = { offset: new kakao.maps.Point(20, 40) };
          
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
          
            marker = new kakao.maps.Marker({
              image: markerImage,
              map: map,
              position: new kakao.maps.LatLng(currentLatitude, currentLongitude),
            });
          
            const monsterImageSrc = "https://cdn-icons-png.flaticon.com/128/11378/11378550.png"; // 팩맨 고스트 아이콘 제작자: Tahsin Tahil - Flaticon
          
            const monsterMarkerImage = new kakao.maps.MarkerImage(monsterImageSrc, imageSize, imageOption);
        
            monsterMarker = new kakao.maps.Marker({
              image: monsterMarkerImage,
              map: map,
              position: new kakao.maps.LatLng(monsterLatitude, monsterLongitude),
            });
          };
          
          window.updatePosition = (latitude, longitude) => {
            const newPosition = new kakao.maps.LatLng(latitude, longitude);
            map.panTo(newPosition);
            marker.setPosition(newPosition);
          };
          
          const timer = setInterval(() => {
            const playerPosition = marker.getPosition();
            const monsterPosition = monsterMarker.getPosition();

            const moveLat = (playerPosition.getLat() - monsterPosition.getLat()) * 0.1;
            const moveLng = (playerPosition.getLng() - monsterPosition.getLng()) * 0.1;

            const newMonsterPosition = new kakao.maps.LatLng(
              monsterPosition.getLat() + moveLat,
              monsterPosition.getLng() + moveLng
            );

            monsterMarker.setPosition(newMonsterPosition);
            
            const distance = Math.sqrt(
              Math.pow(playerPosition.getLat() - newMonsterPosition.getLat(), 2) +
              Math.pow(playerPosition.getLng() - newMonsterPosition.getLng(), 2)
             ) * 111000;
            
            if (distance < 80) {
              window.ReactNativeWebView.postMessage("GAME_OVER");
              clearInterval(timer);
            }
          }, 1000);
        </script>       
    </body>
</html>    
`;

  const handleWebViewMessage = (event) => {
    if (event.nativeEvent.data === "GAME_OVER" && !gameWon) {
      setGameOver(true);
      Alert.alert(
        "Game Over!",
        "몬스터에게 잡혔습니다!",
        [
          {
            text: "OK",
            onPress: () => router.push('/main'),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.exitText}>X</Text>
        </TouchableOpacity>
      </View>

      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: html }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoad={() => {
          if (currentPosition && webViewRef.current) {
            webViewRef.current.injectJavaScript(`
              if (window.setInitialPosition) {
              window.setInitialPosition(
                ${currentPosition.latitude}, 
                ${currentPosition.longitude},
                ${monsterPosition.latitude},
                ${monsterPosition.longitude},
              );
            }
            `);
          }
        }}
        onMessage={handleWebViewMessage}
      />

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>미니게임을 종료하겠습니까?</Text>
            <View style={styles.closeButtonBox}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setModalVisible(false);
                  setTimeout(() => {
                    router.push("/main");
                  }, 1);
                }}
              >
                <Text>네</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text>아니요</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timerContainer: {
    position: 'absolute',
    flex: 0,
    flexDirection: 'row',
    gap: 20,
    top: 10,
    left: '50%',
    transform: [{ translateX: -50 }],
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  timerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exitText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    width: 50,
    height: 30,
  },
  closeButtonBox: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  }
});

export default App;