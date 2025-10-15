import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const AtributosSection = ({ atributos, pericias, nivel, editMode, onSaveAtributos, onSavePericias }) => {
  const calcBonusProficiencia = (lvl) => {
    return Math.ceil(lvl / 4) + 1;
  };

  const calcModificador = (valor) => {
    return Math.floor((valor - 10) / 2);
  };

  const formatModificador = (mod) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const handleChangeAtributos = (key, value) => {
    if (editMode) {
      const newAtributos = { ...atributos, [key]: Number(value) };
      onSaveAtributos(newAtributos);
    }
  };

  const handleToggleProficiencia = (periciaId) => {
    if (editMode) {
      const newPericias = { ...pericias, [periciaId]: !pericias[periciaId] };
      onSavePericias(newPericias);
    }
  };

  const atributosLabels = {
    forca: { nome: "Força", abrev: "FOR" },
    destreza: { nome: "Destreza", abrev: "DES" },
    constituicao: { nome: "Constituição", abrev: "CON" },
    inteligencia: { nome: "Inteligência", abrev: "INT" },
    sabedoria: { nome: "Sabedoria", abrev: "SAB" },
    carisma: { nome: "Carisma", abrev: "CAR" },
  };

  const periciasInfo = [
    { id: "acrobacia", nome: "Acrobacia", atributo: "destreza" },
    { id: "arcanismo", nome: "Arcanismo", atributo: "inteligencia" },
    { id: "atletismo", nome: "Atletismo", atributo: "forca" },
    { id: "atuacao", nome: "Atuação", atributo: "carisma" },
    { id: "enganacao", nome: "Enganação", atributo: "carisma" },
    { id: "furtividade", nome: "Furtividade", atributo: "destreza" },
    { id: "historia", nome: "História", atributo: "inteligencia" },
    { id: "intimidacao", nome: "Intimidação", atributo: "carisma" },
    { id: "intuicao", nome: "Intuição", atributo: "sabedoria" },
    { id: "investigacao", nome: "Investigação", atributo: "inteligencia" },
    { id: "lidarComAnimais", nome: "Lidar com Animais", atributo: "sabedoria" },
    { id: "medicina", nome: "Medicina", atributo: "sabedoria" },
    { id: "natureza", nome: "Natureza", atributo: "inteligencia" },
    { id: "percepcao", nome: "Percepção", atributo: "sabedoria" },
    { id: "persuasao", nome: "Persuasão", atributo: "carisma" },
    { id: "prestidigitacao", nome: "Prestidigitação", atributo: "destreza" },
    { id: "religiao", nome: "Religião", atributo: "inteligencia" },
    { id: "sobrevivencia", nome: "Sobrevivência", atributo: "sabedoria" },
  ];

  const bonusProficiencia = calcBonusProficiencia(nivel);

  const calcBonusPericia = (periciaId) => {
    const info = periciasInfo.find((p) => p.id === periciaId);
    const modAtributo = calcModificador(atributos[info.atributo]);
    if (pericias[periciaId]) {
      return modAtributo + bonusProficiencia;
    }
    return modAtributo;
  };

  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>💪</Text>
        <Text style={styles.sectionTitle}>Atributos</Text>
      </View>
      <View style={styles.atributosGrid}>
        {Object.entries(atributosLabels).map(([key, { nome, abrev }]) => (
          <View key={key} style={styles.atributoCard}>
            <Text style={styles.atributoHeader}>{abrev}</Text>
            <Text style={styles.atributoNome}>{nome}</Text>
            <View style={styles.atributoValorContainer}>
              {editMode ? (
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleChangeAtributos(key, value)}
                  value={String(atributos[key])}
                  keyboardType="numeric"
                  maxLength={2}
                />
              ) : (
                <Text style={styles.atributoValor}>{atributos[key]}</Text>
              )}
            </View>
            <Text style={styles.atributoModificador}>{formatModificador(calcModificador(atributos[key]))}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>🎯</Text>
        <Text style={styles.sectionTitle}>Perícias e Proficiências</Text>
      </View>
      <View style={styles.bonusProficiencia}>
        <Text style={styles.bonusProficienciaText}>Bônus de Proficiência: </Text>
        <Text style={styles.bonusValor}>{formatModificador(bonusProficiencia)}</Text>
      </View>
      <View style={styles.periciasList}>
        {periciasInfo.map((pericia) => (
          <TouchableOpacity
            key={pericia.id}
            style={[styles.periciaItem, pericias[pericia.id] && styles.proficientePericia]}
            onPress={() => handleToggleProficiencia(pericia.id)}
            disabled={!editMode} // Desabilita o toggle se não estiver em modo de edição
          >
            <Text style={styles.periciaProficiente}>{pericias[pericia.id] ? "●" : "○"}</Text>
            <Text style={styles.periciaBonus}>{formatModificador(calcBonusPericia(pericia.id))}</Text>
            <Text style={styles.periciaNome}>{pericia.nome}</Text>
            <Text style={styles.periciaAtributo}>
              ({pericia.atributo.substring(0, 3).toUpperCase()})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.outrasProficiencias}>
        <Text style={styles.outrasProficienciasTitle}>Outras Proficiências e Idiomas</Text>
        <View style={styles.proficienciasContent}>
          {editMode ? (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Adicione outras proficiências e idiomas aqui..."
              defaultValue="Idiomas: Comum, Anão\nArmas: Simples, Marciais\nArmaduras: Todas as armaduras e escudos\nFerramentas: Ferramentas de ferreiro"
              multiline
              textAlignVertical="top"
              // onSave precisa ser implementado para este campo
            />
          ) : (
            <View style={styles.proficienciasTextContainer}>
              <Text style={styles.proficienciasText}>
                <Text style={styles.boldText}>Idiomas:</Text> Comum, Anão
              </Text>
              <Text style={styles.proficienciasText}>
                <Text style={styles.boldText}>Armas:</Text> Simples, Marciais
              </Text>
              <Text style={styles.proficienciasText}>
                <Text style={styles.boldText}>Armaduras:</Text> Todas as armaduras e escudos
              </Text>
              <Text style={styles.proficienciasText}>
                <Text style={styles.boldText}>Ferramentas:</Text> Ferramentas de ferreiro
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  atributosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  atributoCard: {
    width: '30%', // Aproximadamente 3 colunas
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  atributoHeader: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  atributoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  atributoValorContainer: {
    minHeight: 30, // Para alinhar com o TextInput
    justifyContent: 'center',
  },
  atributoValor: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
  },
  atributoModificador: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    fontSize: 16,
    textAlign: 'center',
    width: 50,
  },
  bonusProficiencia: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 15,
  },
  bonusProficienciaText: {
    fontSize: 16,
    color: '#333',
  },
  bonusValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  periciasList: {
    marginBottom: 20,
  },
  periciaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  proficientePericia: {
    backgroundColor: '#e6f7ff', // Cor de fundo para proficiente
  },
  periciaProficiente: {
    fontSize: 18,
    marginRight: 10,
    color: '#007bff',
  },
  periciaBonus: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: 40,
    textAlign: 'center',
  },
  periciaNome: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  periciaAtributo: {
    fontSize: 14,
    color: '#666',
  },
  outrasProficiencias: {
    marginTop: 10,
  },
  outrasProficienciasTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  proficienciasContent: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
  },
  proficienciasTextContainer: {
    // Estilos para o texto quando não está em modo de edição
  },
  proficienciasText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  textArea: {
    minHeight: 100,
  },
});

export default AtributosSection;

