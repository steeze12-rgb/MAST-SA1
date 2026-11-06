import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Dish } from '../App';

const SplashScreen = ({ navigation, dishes, setDishes }: any) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | Dish['course']>('All');

  // ===== REQUIREMENT 2: SEARCH AND FILTER =====
  const filtered = dishes.filter((d: Dish) => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || d.course === filter;
    return matchesSearch && matchesFilter;
  });

  const clearFilters = () => {
    setSearch('');
    setFilter('All');
  };

  // ===== REQUIREMENT 1: DELETE =====
  const deleteDish = (id: string) => {
    Alert.alert('Delete?', 'Remove this dish?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setDishes((prev: Dish[]) => prev.filter(x => x.id !== id)) }
    ]);
  };

  // ===== REQUIREMENT 3: STATISTICS =====
  const total = dishes.length;
  const avg = total > 0 ? (dishes.reduce((s: number, d: Dish) => s + (parseFloat(d.price) || 0), 0) / total).toFixed(2) : '0.00';
  const starters = dishes.filter((d: Dish) => d.course === 'Starter').length;
  const mains = dishes.filter((d: Dish) => d.course === 'Main').length;
  const desserts = dishes.filter((d: Dish) => d.course === 'Dessert').length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Menu Manager</Text>
        <Text style={styles.sub}>{dishes.length} dishes • Live</Text>

        {/* SEARCH */}
        <TextInput style={styles.search} placeholder="Search by name..." placeholderTextColor="#888" value={search} onChangeText={setSearch} />
       
        {/* FILTER */}
        <View style={styles.filterRow}>
          {(['All','Starter','Main','Dessert'] as const).map(c => (
            <TouchableOpacity key={c} style={[styles.filterBtn, filter===c && styles.filterActive]} onPress={() => setFilter(c)}>
              <Text style={styles.filterText}>{c}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={clearFilters}><Text style={{color:'#FF8C42', fontSize:12, marginLeft:8}}>Clear</Text></TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
        {/* REQUIREMENT 3: STATISTICS DISPLAY */}
        <View style={styles.statsBox}>
          <Text style={styles.statsTitle}>Menu Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}><Text style={styles.statNum}>{total}</Text><Text style={styles.statLabel}>Total Items</Text></View>
            <View style={styles.stat}><Text style={styles.statNum}>R {avg}</Text><Text style={styles.statLabel}>Average Price</Text></View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statSmall}><Text style={styles.statSmallNum}>{starters}</Text><Text style={styles.statLabel}>Starters</Text></View>
            <View style={styles.statSmall}><Text style={styles.statSmallNum}>{mains}</Text><Text style={styles.statLabel}>Mains</Text></View>
            <View style={styles.statSmall}><Text style={styles.statSmallNum}>{desserts}</Text><Text style={styles.statLabel}>Desserts</Text></View>
          </View>
        </View>

        {/* MENU LIST */}
        {filtered.map((item: Dish) => (
          <View key={item.id} style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishDesc}>{item.description} • {item.course}</Text>
            </View>
            <View style={{ alignItems:'flex-end', marginLeft:10 }}>
              <Text style={styles.price}>R {item.price}</Text>
              <View style={{ flexDirection:'row', gap:10, marginTop:6 }}>
                <TouchableOpacity onPress={() => navigation.navigate('MainActivity', { dish: item })}><Text style={{color:'#4CAF7D', fontSize:12, fontWeight:'bold'}}>Edit</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => deleteDish(item.id)}><Text style={{color:'#FF5252', fontSize:12}}>Delete</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('MainActivity')}>
          <Text style={styles.addBtnText}>+ Add Dish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ flex:1, backgroundColor:'#121212' },
  header:{ backgroundColor:'#1E1E1E', paddingTop:60, paddingBottom:20, paddingHorizontal:20, borderBottomLeftRadius:20, borderBottomRightRadius:20 },
  title:{ color:'#fff', fontSize:22, fontWeight:'bold' },
  sub:{ color:'#999', fontSize:12, marginTop:4 },
  search:{ backgroundColor:'#2A2A2A', borderRadius:10, padding:12, color:'#fff', marginTop:16, borderWidth:1, borderColor:'#333' },
  filterRow:{ flexDirection:'row', alignItems:'center', marginTop:12, gap:8 },
  filterBtn:{ backgroundColor:'#2A2A2A', paddingHorizontal:14, paddingVertical:6, borderRadius:20, borderWidth:1, borderColor:'#333' },
  filterActive:{ backgroundColor:'#FF8C42', borderColor:'#FF8C42' },
  filterText:{ color:'#fff', fontSize:12 },
  statsBox:{ backgroundColor:'#1E1E1E', borderRadius:16, padding:16, marginBottom:16, borderWidth:1, borderColor:'#333' },
  statsTitle:{ color:'#fff', fontWeight:'bold', fontSize:14, marginBottom:12 },
  statsRow:{ flexDirection:'row', gap:12, marginBottom:10 },
  stat:{ flex:1, backgroundColor:'#2A2A2A', borderRadius:12, padding:12, alignItems:'center' },
  statNum:{ color:'#FF8C42', fontSize:20, fontWeight:'bold' },
  statLabel:{ color:'#888', fontSize:10, marginTop:4 },
  statSmall:{ flex:1, backgroundColor:'#2A2A2A', borderRadius:10, padding:10, alignItems:'center' },
  statSmallNum:{ color:'#4CAF7D', fontSize:16, fontWeight:'bold' },
  card:{ backgroundColor:'#1E1E1E', borderRadius:12, padding:16, marginBottom:12, flexDirection:'row', justifyContent:'space-between' },
  dishName:{ color:'#fff', fontSize:15, fontWeight:'bold' },
  dishDesc:{ color:'#888', fontSize:11, marginTop:4 },
  price:{ color:'#FF8C42', fontWeight:'bold', fontSize:14 },
  addBtn:{ backgroundColor:'#FF8C42', borderRadius:12, padding:16, alignItems:'center', marginTop:10 },
  addBtnText:{ color:'#000', fontWeight:'bold', fontSize:16 },
});

export default SplashScreen;