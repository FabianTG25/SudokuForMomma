import AsyncStorage from "@react-native-async-storage/async-storage";

export async function saveObject(key: string, obj: any): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    // ignore for now
  }
}

export async function loadObject<T = any>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    return null;
  }
}
