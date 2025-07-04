// app/signup.js

import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signup() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [visible, setVisible] = useState(false);
  const [popupType, setPopupType] = useState(null); // "terms" or "privacy"

  const TERMS_TEXT = `
1. 서비스 이용자는 서비스 약관에 동의해야 합니다.
2. 서비스는 예고 없이 변경될 수 있으며...
3. 기타 등등...
  `;

  const PRIVACY_TEXT = `
1. 개인정보는 안전하게 저장되며, 외부에 제공되지 않습니다.
2. 이메일, 닉네임 등 수집 항목은 다음과 같습니다.
3. 기타 개인정보 관련 방침...
  `;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입을 해주세요.</Text>

      {/* 닉네임 */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="닉네임"
          placeholderTextColor="#999"
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
        />
        <TouchableOpacity style={styles.checkButton}>
          <Text style={styles.checkButtonText}>중복 확인</Text>
        </TouchableOpacity>
      </View>

      {/* 이메일 */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder="이메일 주소"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity style={styles.checkButton}>
          <Text style={styles.checkButtonText}>중복 확인</Text>
        </TouchableOpacity>
      </View>

      {/* 비밀번호 */}
      <TextInput
        placeholder="비밀번호"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.inputFull}
        value={password}
        onChangeText={setPassword}
      />

      {/* 비밀번호 확인 */}
      <TextInput
        placeholder="비밀번호 확인"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.inputFull}
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
      />

      {/* 체크박스 */}
      <View style={styles.checkboxRow}>
        <Checkbox
          value={agreeTerms}
          onValueChange={setAgreeTerms}
          color={agreeTerms ? "#B491DD" : undefined}
        />
        <TouchableOpacity
          onPress={() => {
            setPopupType("terms");
            setVisible(true);
          }}
        >
          <Text style={[styles.checkboxLabel, styles.underline]}>
            이용 약관
          </Text>
        </TouchableOpacity>
        <Text>에 동의합니다.</Text>
      </View>

      <View style={styles.checkboxRow}>
        <Checkbox
          value={agreePrivacy}
          onValueChange={setAgreePrivacy}
          color={agreePrivacy ? "#B491DD" : undefined}
        />
        <TouchableOpacity
          onPress={() => {
            setPopupType("privacy");
            setVisible(true);
          }}
        >
          <Text style={[styles.checkboxLabel, styles.underline]}>
            개인정보 처리 방침
          </Text>
        </TouchableOpacity>
        <Text>에 동의합니다.</Text>
      </View>

      {/* 팝업 모달 */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={{ maxHeight: 400 }}>
              <Text>
                {popupType === "terms" && TERMS_TEXT}
                {popupType === "privacy" && PRIVACY_TEXT}
                {popupType === "alert" &&
                  "이용약관과 개인정보 처리 방침에 동의해주세요."}
                {popupType === "success" && "회원가입 성공!"}
              </Text>
            </ScrollView>

            {/* 닫기 버튼: success일 때만 숨김 */}
            {popupType !== "success" && (
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.buttonText}>닫기</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>

      {/* 회원가입 버튼 */}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => {
          if (!agreeTerms || !agreePrivacy) {
            setPopupType("alert");
            setVisible(true);
          } else {
            // TODO: 여기에 회원가입 로직 추가
            console.log("회원가입 진행");
            setPopupType("success");
            setVisible(true);
            setTimeout(() => {
              setVisible(false);
              router.push("/login");
            }, 1000);
          }
        }}
      >
        <Text style={styles.submitButtonText}>회원가입</Text>
      </TouchableOpacity>

      {/* 로그인하러 가기 */}
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.bottomText}>
          이미 가입하셨나요? {">"} 로그인하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingHorizontal: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  inputFull: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  checkButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "#eee",
  },
  checkButtonText: {
    fontSize: 12,
    color: "#555",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "#B491DD",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomText: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: "80%",
    alignItems: "center",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#B491DD",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  underline: {
    textDecorationLine: "underline",
  },
});
