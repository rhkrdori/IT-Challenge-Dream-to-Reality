// app/login.js

import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const [autoLogin, setAutoLogin] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인을 해주세요.</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일 주소"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor="#aaa"
        secureTextEntry
      />

      <View style={styles.checkboxRow}>
        <Checkbox
          value={autoLogin}
          onValueChange={setAutoLogin}
          color={autoLogin ? "#B491DD" : undefined}
        />
        <TouchableOpacity
          onPress={() => {
            setPopupType("terms");
            setVisible(true);
          }}
        >
          <Text style={[styles.checkboxLabel]}>자동 로그인</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => router.push("/question1")}
      >
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.signupLink}>
          아직 회원이 아니신가요? &gt; 회원가입하기
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxWrapper: { flexDirection: "row", alignItems: "center" },
  findText: { fontSize: 12, color: "#555" },
  loginBtn: {
    backgroundColor: "#a582d9",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  loginText: { color: "#fff", fontWeight: "bold" },
  signupLink: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
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
});
