import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  StatusBar,
} from 'react-native';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  isExpense: boolean;
}

export default function App() {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const totalBalance = transactions.reduce((acc, item) => {
    return item.isExpense ? acc - item.amount : acc + item.amount;
  }, 0);

  const addTransaction = (isExpense: boolean) => {
    if (!title.trim() || !amount.trim()) return;

    const parsedAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: parsedAmount,
      isExpense: isExpense,
    };

    setTransactions([newTransaction, ...transactions]);
    setTitle('');
    setAmount('');
    Keyboard.dismiss();
  };

  return (
    <View className="flex-1 bg-slate-100 pt-10 px-5">
      <StatusBar barStyle="dark-content" />
      <Text className="text-2xl font-bold text-center mb-5 text-slate-800">
        Költségkalkulátor
      </Text>

      <View className="bg-white p-5 rounded-2xl items-center shadow-md mb-5">
        <Text className="text-sm text-slate-500">Aktuális egyenleg</Text>
        <Text
          className={`text-3xl font-bold mt-1 ${
            totalBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {totalBalance.toLocaleString('hu-HU')} Ft
        </Text>
      </View>

      <View className="bg-white p-4 rounded-2xl mb-5 shadow-sm">
        <TextInput
          className="border border-slate-200 p-3 rounded-xl mb-3 text-base bg-slate-50"
          placeholder="Megnevezés (pl. Kávé, Tankolás)"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          className="border border-slate-200 p-3 rounded-xl mb-4 text-base bg-slate-50"
          placeholder="Összeg (Ft)"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <View className="flex-row gap-3">
          <TouchableOpacity
            className="flex-1 bg-emerald-600 p-3.5 rounded-xl items-center"
            onPress={() => addTransaction(false)}
          >
            <Text className="text-white font-bold text-base">+ Bevétel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 bg-rose-600 p-3.5 rounded-xl items-center"
            onPress={() => addTransaction(true)}
          >
            <Text className="text-white font-bold text-base">- Kiadás</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-lg font-bold mb-3 text-slate-800">Előzmények</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text className="text-center text-slate-400 mt-5">
            Még nincs rögzített tétel.
          </Text>
        }
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-xl flex-row justify-between items-center mb-2 shadow-sm">
            <Text className="text-base text-slate-700">{item.title}</Text>
            <Text
              className={`text-base font-bold ${
                item.isExpense ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {item.isExpense ? '-' : '+'}{item.amount.toLocaleString('hu-HU')} Ft
            </Text>
          </View>
        )}
      />
    </View>
  );
}