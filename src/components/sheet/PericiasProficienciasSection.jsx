import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const PericiasProficienciasSection = ({ pericias, atributos, nivel, editMode, onSave }) => {
  const calcModificador = (valor) => {
    return Math.floor((valor - 10) / 2);
  };

  const formatModificador = (mod) => {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const calcBonusProficiencia = (nivel) => {
    // D&D 5e proficiency bonus: +2 at levels 1-4, +3 at 5-8, +4 at 9-12, +5 at 13-16, +6 at 17-20
    if (nivel >= 17) return 6;
    if (nivel >= 13) return 5;
    if (nivel >= 9) return 4;
    if (nivel >= 5) return 3;
    return 2;
  };

  const handleToggleProficiencia = (periciaId) => {
    if (editMode) {
      const updatedPericias = {
        ...pericias,
        [periciaId]: !pericias[periciaId],
      };
      onSave(updatedPericias);
    }
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
        <Text style={styles.sectionIcon}>🎯</Text>
        <Text style={styles.sectionTitle}>Perícias e Proficiências</Text>
      </View>

      <View style={styles.bonusProficienciaContainer}>
        <Text style={styles.bonusProficienciaText}>Bônus de Proficiência: </Text>
        <Text style={styles.bonusValor}>{formatModificador(bonusProficiencia)}</Text>
      </View>

      <View style={styles.periciasList}>
        {periciasInfo.map((pericia) => (
          <TouchableOpacity
            key={pericia.id}
            style={[styles.periciaItem, pericias[pericia.id] && styles.proficientePericia]}
            onPress={() => handleToggleProficiencia(pericia.id)}
            disabled={!editMode}
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
              // onSave para este campo precisa ser implementado no componente pai (SheetPage)
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
  bonusProficienciaContainer: {
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
    backgroundColor: '#e6f7ff',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
    textAlign: 'left',
    width: '100%',
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});

export default PericiasProficienciasSection;

