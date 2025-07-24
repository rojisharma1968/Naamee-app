import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

const Tabs = ({ tabs = [], activeTab, onChange, useIcons = false, wrapClass }) => {
  return (
    <View className={`flex-row justify-around py-2 ${wrapClass}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            className={`py-2 px-3 rounded-md ${
              isActive ? 'bg-primary/30' : 'bg-transparent'
            }`}
          >
            {useIcons ? (
              <Feather
                name={tab.icon}
                size={22}
                color={isActive ? '#5ba1d6' : 'gray'}
              />
            ) : (
              <Text
                className={`capitalize ${
                  isActive ? 'text-primary font-bold' : 'text-gray-400'
                }`}
              >
                {tab.label}
              </Text>
            )}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default Tabs
