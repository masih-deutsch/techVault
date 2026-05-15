import { create } from 'zustand';

export const useLibStore = create(() => ({
  modalStatus: false,

  target: {
    id: '',
    name: '',
    category: '',
    description: '',
    installCommand: '',
    docsUrl: '',
    isBookmarked: false,
    personalNote: null,
  },

  newEntryStatus: true,
}));




export function setModalStatus(input) {
  useLibStore.setState({ modalStatus: input });
}





export function setTarget(input) {
  useLibStore.setState({
    target: {
      id: input.id,
      name: input.name,
      category: input.category,
      description: input.description,
      installCommand: input.installCommand,
      docsUrl: input.docsUrl,
      isBookmarked: input.isBookmarked,
      personalNote: input.personalNote,
    },
  });
}




export function resetTarget() {
  useLibStore.setState({
    target: {
      id: '',
      name: '',
      category: '',
      description: '',
      installCommand: '',
      docsUrl: '',
      isBookmarked: false,
      personalNote: null,
    },
  });
}




export function setNewEntryStatus(input) {
  useLibStore.setState({ newEntryStatus: input });
}
