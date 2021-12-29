import * as SQLite from 'expo-sqlite';
export const openMyDatabase= {
    getConnection: () => SQLite.openDatabase("rositasDB.db")
}