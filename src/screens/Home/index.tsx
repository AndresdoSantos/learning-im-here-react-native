import { useRef, useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, TextInputProps } from 'react-native'

import { Participant } from '../../components/Participant'

import { styles } from './styles'

export function Home() {
  const inputRef = useRef(null)

  const [paticipantName, setPaticipantName] = useState('')

  const [participants, setParticipants] = useState<string[]>([])

  function handleParticipantAdd() {
    setParticipants((oldState) => {
      if (oldState.includes(paticipantName)) {
        Alert.alert('Já existe', 'Esse participante já existe.')

        return [...oldState]
      }

      setPaticipantName('')

      Alert.alert('Sucesso', 'Participante adicionado com sucesso.')

      return [...oldState, paticipantName]
    })
  }

  function handleParticipantRemove(participantName: string) {
    Alert.alert(
      'Remover', 
      `Você deseja realmente remover ${participantName}?`,
      [
        {
          text: 'Sim',
          onPress: () => setParticipants(
            participants.filter((participant) => participant !== participantName)
          ),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]
    )

    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Nome do Evento</Text>
      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022</Text>

      <View style={styles.form}>
        <TextInput
          ref={inputRef}
          onChangeText={setPaticipantName}
          value={paticipantName}
          style={styles.input} 
          placeholder="Nome do participante"
          placeholderTextColor="#6b6b6b"
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        showsVerticalScrollIndicator={false}
        data={participants}
        keyExtractor={(key) => key}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou ao evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
        renderItem={({ item: participant }) => (
          <Participant
            key={participant}
            participant={participant}
            onRemove={() => handleParticipantRemove(participant)} 
          />
        )}
      />
    </View>
  )
}