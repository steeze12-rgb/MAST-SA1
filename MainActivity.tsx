import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const MainActivity = ({ navigation, route, setDishes }: any) => {
  const existing = route.params?.dish;
  const [name, setName] = useState(existing?.name || '');
  const [desc, setDesc] = useState(existing?.description || '');
  const [course, setCourse] = useState(existing?.course || 'Main');
  const [price, setPrice] = useState(existing?.price || '');

  const save = () => {
    if(!name || !price) return;
    if(existing){
      // EDIT existing - Requirement 1
      setDishes((prev: any) => prev.map((d: any) => d.id === existing.id ? { ...d, name, description: desc, course, price } : d));
    } else {
      // ADD new
      setDishes((prev: any) => [...prev, { id: Date.now().toString(), name, description: desc, course, price }]);
    }
    navigation.goBack(); // changes reflected immediately
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.back}>‹</Text></TouchableOpacity>
        <Text style={styles.title}>{existing ? 'Edit Dish' : 'Add to Menu'}</Text>
        <View style={{width:20}}/>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>DISH NAME *</Text>
        <TextInput style={styles.input} placeholderTextColor="#666" value={name} onChangeText={setName} />
        <Text style={styles.label}>DESCRIPTION</Text>
        <TextInput style={[styles.input, {height:80}]} multiline placeholderTextColor="#666" value={desc} onChangeText={setDesc} />
        <Text style={styles.label}>COURSE</Text>
        <View style={styles.courseRow}>
          {(['Starter','Main','Dessert'] as const).map(c => (
            <TouchableOpacity key={c} style={[styles.courseBtn, course===c && styles.courseActive]} onPress={() => setCourse(c)}><Text style={styles.courseText}>{c}</Text></TouchableOpacity>
          ))}
        </View>
        <Text style={styles.label}>PRICE (R) *</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholderTextColor="#666" value={price} onChangeText={setPrice} />
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.cancel} onPress={() => navigation.goBack()}><Text style={{color:'#fff'}}>Cancel</Text></TouchableOpacity>
          <TouchableOpacity style={styles.save} onPress={save}><Text style={{color:'#000', fontWeight:'bold'}}>{existing ? 'Update' : 'Add to Menu'}</Text></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#121212' },
  header:{ flexDirection:'row', justifyContent:'space-between', alignItems:'center', backgroundColor:'#1E1E1E', paddingTop:60, paddingBottom:20, paddingHorizontal:20 },
  back:{ color:'#fff', fontSize:30 },
  title:{ color:'#fff', fontSize:18, fontWeight:'bold' },
  form:{ padding:20 },
  label:{ color:'#888', fontSize:10, marginTop:18, marginBottom:6, letterSpacing:1 },
  input:{ backgroundColor:'#1E1E1E', color:'#fff', borderRadius:10, padding:14, borderWidth:1, borderColor:'#333' },
  courseRow:{ flexDirection:'row', gap:10 },
  courseBtn:{ flex:1, backgroundColor:'#1E1E1E', borderRadius:8, padding:10, alignItems:'center', borderWidth:1, borderColor:'#333' },
  courseActive:{ backgroundColor:'#4CAF7D', borderColor:'#4CAF7D' },
  courseText:{ color:'#fff', fontSize:12 },
  btnRow:{ flexDirection:'row', marginTop:30, gap:12 },
  cancel:{ flex:1, borderWidth:1, borderColor:'#333', borderRadius:12, padding:16, alignItems:'center' },
  save:{ flex:1, backgroundColor:'#FF8C42', borderRadius:12, padding:16, alignItems:'center' },
});

export default MainActivity;