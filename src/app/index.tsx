import { Platform, StyleSheet } from 'react-native';
import { View, Text, TextInput } from 'react-native';
import "../global.css";
import Button from '@/components/Button';


export default function HomeScreen() {
  return (
    <View className='bg-slate-100 flex items-center w-full h-full'>
      <View className='bg-white p-5 rounded-2xl items-center shadow-md mb-5 mt-24'>
        <Text className='text-xl text-gray-500'>Egyenleg</Text>
        <Text className='text-4xl font-bold text-slate-800'>200,000</Text>
      </View>

      <View className='bg-white p-5 rounded-2xl items-center shadow-md mb-5 mt-24'>
        <TextInput
          defaultValue="hello"
          placeholder="Type here"
          onChangeText={value => console.log(value)}
        />
        <View className='flex-row'>
          <Button label='+ Bevétel' color="bg-[#059669]"  size='w-[120px] h-[70px]'></Button>
          <Button label='- Kiadás' color="bg-[#e11d48]"  size='w-[120px] h-[70px]'></Button>
        </View>
        
      </View>
    </View>
  );
}
