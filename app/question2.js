import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function StudySubScreen() {
  const navigation = useNavigation();
  const [hours, setHours] = useState("");
  const router = useRouter();

  const handleComplete = () => {
    console.log("입력된 시간:", hours);
    // 여기에 제출 로직 추가
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          {/* 상단 뒤로가기 */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>

          {/* 질문 */}
          <Text style={styles.title}>하루에 몇 과목까지 공부할 수 있나요?</Text>

          {/* 중앙 입력 영역 */}
          <View style={styles.center}>
            <TextInput
              style={styles.input}
              value={hours}
              onChangeText={setHours}
              keyboardType="numeric"
              placeholder="숫자를 입력해주세요."
              placeholderTextColor="#ccc"
            />
            <Text style={styles.subText}>
              최대 과목 수를 입력하면 맞춤형으로 계획해드릴게요.
            </Text>
          </View>

          {/* 하단 버튼들 */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => {
                console.log("건너뛰기");
                router.push("/question3");
              }}
            >
              <Text style={styles.confirmText}>선택 완료</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                console.log("건너뛰기");
                router.push("/question3");
              }}
            >
              <Text style={styles.skipText}>건너뛰기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 64,
    justifyContent: "space-between",
  },
  backButton: {
    position: "absolute",
    top: 44,
    left: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 32,
  },
  center: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 100, // ← 숫자 조절해서 위치 조정 가능!
  },

  input: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 8,
    color: "#000",
  },
  subText: {
    marginTop: 8,
    color: "#aaa",
    fontSize: 13,
  },
  bottomButtons: {
    paddingBottom: 32,
  },
  confirmButton: {
    backgroundColor: "#A78BFA",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skipText: {
    marginTop: 16,
    color: "#000",
    fontSize: 14,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
