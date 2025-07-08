import { Ionicons } from "@expo/vector-icons";
import { addDays, format, subDays } from "date-fns";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function HomeScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("홈");

  const [date, setDate] = useState(new Date());
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const tabs = [
    { name: "홈", label: "홈" },
    { name: "노트", label: "노트" },
    { name: "퀴즈", label: "퀴즈" },
    { name: "마이페이지", label: "마이페이지" },
  ];
  const [modalVisible, setModalVisible] = useState(false); // BottomSheet 대신 Modal
  const [plans, setPlans] = useState([
    {
      id: 1,
      title: "추천시스템",
      isExpanded: false,
      checked: false,
      todos: [
        { id: "1-1", title: "하이퍼파라미터 튜닝", checked: false },
        { id: "1-2", title: "논문 읽기", checked: false },
      ],
    },
    {
      id: 2,
      title: "고급기계학습",
      isExpanded: false,
      checked: false,
      todos: [{ id: "2-1", title: "과제 3번 제출", checked: false }],
    },
  ]);

  const goToPrevDate = () => setDate(subDays(date, 1));
  const goToNextDate = () => setDate(addDays(date, 1));
  const toggleExpand = (id) => {
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, isExpanded: !plan.isExpanded } : plan
      )
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <LinearGradient
            colors={["#F4EDFF", "#FFFFFF"]}
            style={styles.gradient}
          >
            <View style={styles.contentWrapper}>
              {/* 상단 제목 */}
              <Text style={styles.title}>
                {"\n"} 다가오는 시험을 등록해보세요!
              </Text>

              {/* 상단 버튼 2개 */}
              <View style={styles.topButtons}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.buttonText}>일정 불러오기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Text style={styles.buttonText}>새로운 일정 생성</Text>
                </TouchableOpacity>
              </View>

              {/* 타이머 + 캐릭터 나란히 배치 */}
              <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.timerButton}>
                  <Ionicons name="time-outline" size={30} color="#B491DD" />
                  <Text style={styles.timerText}>Timer</Text>
                </TouchableOpacity>

                <Image
                  source={require("../assets/images/main.png")}
                  style={styles.character}
                  resizeMode="contain"
                />
              </View>
            </View>
          </LinearGradient>

          {/*todo*/}
          <View style={styles.scheduleBox}>
            <TouchableOpacity onPress={() => setBottomSheetVisible(true)}>
              <View style={styles.handleBar} />
            </TouchableOpacity>

            {/* 일정 */}
            <View style={styles.header}>
              <TouchableOpacity onPress={goToPrevDate}>
                <Ionicons name="chevron-back" size={20} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                <Text style={styles.dateText}>
                  {format(date, "yyyy년 M월 d일")}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={goToNextDate}>
                <Ionicons name="chevron-forward" size={20} />
              </TouchableOpacity>
            </View>
            <View style={styles.card}>
              <Text style={styles.toDoTitle}>오늘의 계획</Text>
              {plans.map((plan) => (
                <View key={plan.id}>
                  {/* ▣ 상위 plan 줄 */}
                  <View style={styles.planItem}>
                    <Checkbox value={plan.checked} />
                    <Text style={styles.planText}>{plan.title}</Text>

                    <TouchableOpacity onPress={() => toggleExpand(plan.id)}>
                      <Ionicons
                        name={plan.isExpanded ? "chevron-back" : "chevron-down"} // ◀ or ▼
                        size={16}
                        color="#555"
                      />
                    </TouchableOpacity>

                    <Ionicons
                      name="ellipsis-vertical"
                      size={16}
                      color="#555"
                      style={{ marginLeft: 8 }}
                    />
                  </View>

                  {/* ▣ 하위 todo들 */}
                  {plan.isExpanded && (
                    <View style={styles.subTodoContainer}>
                      {plan.todos.map((todo) => (
                        <View key={todo.id} style={styles.subTodoItem}>
                          <Checkbox value={todo.checked} />
                          <Text style={styles.subTodoText}>{todo.title}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}

              {/* 달력 모달 */}
              <Modal
                visible={calendarVisible}
                transparent
                animationType="slide"
              >
                <View style={styles.modalBackground}>
                  <View style={styles.calendarContainer}>
                    <Calendar
                      onDayPress={(day) => {
                        setDate(new Date(day.dateString));
                        setCalendarVisible(false);
                      }}
                      markedDates={{
                        [format(date, "yyyy-MM-dd")]: {
                          selected: true,
                          selectedColor: "#B491DD",
                        },
                      }}
                    />
                    <TouchableOpacity onPress={() => setCalendarVisible(false)}>
                      <Text
                        style={{
                          marginTop: 10,
                          color: "#B491DD",
                          textAlign: "center",
                        }}
                      >
                        닫기
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+ 과목</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* 하단 네비게이션 */}
      <View style={styles.bottomNav}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => {
              setActiveTab(tab.name);
              if (tab.name === "노트") router.push("/note");
              //else if (tab.name === "퀴즈") router.push("/quiz");
              //else if (tab.name === "마이페이지") router.push("/mypage");
              else router.push("/"); // 홈
            }}
          >
            <View
              style={[
                styles.dot,
                activeTab === tab.name ? styles.dotActive : styles.dotInactive,
              ]}
            />
            <Text
              style={[
                styles.navText,
                activeTab === tab.name
                  ? styles.navTextActive
                  : styles.navTextInactive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  topButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    alignSelf: "flex-end",
  },
  actionButton: {
    backgroundColor: "#E7DDF3",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#4A3B73",
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    marginBottom: 20,
  },
  timerButton: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F6F0FF",
    padding: 16,
    borderRadius: 20,
  },
  character: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
  timerText: {
    marginTop: 4,
    color: "#B491DD",
    fontWeight: "500",
  },
  calendar: {
    width: "100%",
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 100,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingBottom: 30,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  dotActive: {
    backgroundColor: "#222",
  },
  dotInactive: {
    backgroundColor: "#ccc",
  },
  navText: {
    fontSize: 12,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navTextInactive: {
    color: "#ccc",
  },
  navTextActive: {
    color: "#000",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0)",
  },
  sheetContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  gradient: {
    width: "100%", // 전체 너비
    // padding 제거함!!
  },

  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  card: {
    backgroundColor: "#f5f0ff",
    borderRadius: 20,
    padding: 16,
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  toDoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 12,
  },
  planItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    backgroundColor: "#faf5ff",
    borderRadius: 12,
    marginBottom: 8,
  },
  planText: {
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  addButton: {
    alignSelf: "flex-start",
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: "#e5ddff",
  },
  addButtonText: {
    color: "#6c4ed5",
    fontWeight: "bold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6c4ed5",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    width: "90%",
    alignItems: "center",
  },
  subTodoContainer: {
    marginLeft: 32, // 들여쓰기
    marginTop: 4,
  },

  subTodoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  subTodoText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  scheduleBox: {
    backgroundColor: "#f4edff",
    borderRadius: 20,
    padding: 16,
    //marginVertical: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  handleBar: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D0D4DB",
    marginBottom: 12,
    alignSelf: "center",
  },
});
