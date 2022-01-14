import { useEffect } from 'react';
import AppNavigation from './components/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import OrderState from './context/OrderState';
import * as SQLite from 'expo-sqlite'

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => { },
        };
      },
    };
  }

  const db = SQLite.openDatabase("rositasDB.db");
  return db;
}
const db = openDatabase();
export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists food (id text primary key not null, name text, price real, category text);"
      );
      tx.executeSql(
        "'create table if not exists sellings (id integer primary key autoincrement, selldate text, total real);'"
      );
    });
  }, []);

  return (
    <NavigationContainer>
      <OrderState>
        <AppNavigation />
      </OrderState>
    </NavigationContainer>
  );
}


