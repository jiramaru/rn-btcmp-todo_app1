import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";


export default function Index() {
  return (
    <View
      style= {styles.container}>
      <Text style= {styles.one}>Hello, Deo</Text>      
      <Text style= {styles.two}>What's Gooood!?</Text>
      <Link href="/about">Visite about page</Link>
      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefefe"
  },
  one: {
    fontSize: 22
  },
  two: {
    fontSize: 18,
    backgroundColor: "#eee",
    color: "#123",
    padding: 5,
    borderRadius: 5,
    elevation: 5,
    margin: 5
  }
})
