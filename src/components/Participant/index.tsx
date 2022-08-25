import { View, Text, TouchableOpacity } from 'react-native'

import { styles } from './styles'

type ParticipantProps = {
  participant: string
  onRemove: () => void
}

export function Participant({ participant, onRemove }: ParticipantProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{participant}</Text>

      <TouchableOpacity style={styles.button} onPress={onRemove}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
    </View>
  )
}