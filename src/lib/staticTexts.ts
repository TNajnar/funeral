/* region Pages */

export const dashboard = {
  graphText: 'Graf o sjednaných službách a pohřbech ',
  in: 'v',
  newFuneral: 'Nový pohřeb',
  newService: 'Nová služba',
  funerals: 'Naplánované pohřby',
  services: 'Naplánované služby',
  funeralTooltip: 'Přidej nový pohřeb',
  serviceTooltip: 'Přidej novou službu',
};

export const loginTexts = {
  title: 'Příhlášení',
  email: 'Email',
  password: 'Heslo',
  login: 'Příhlášení',
  emailError: 'Prosím vložte platnou emailovou adresu.',
  passwordError: 'Heslo musí mít alespoň 6 znaků.',
};

export const warehouseControl = {
  addNewItem: 'Přidat položku',
  searchItem: 'Hledat položku',

  filterTabs: {
    categoryModalTitle: 'Vytvoř novou kategorii',
    categoryModalTitleEdit: 'Editovat kategorie',

    editCategory: {
      label: 'Název kategorie',
      error: 'Neplatný název kategorie.',
      submit: 'Potvrdit',
      cancel: 'Zrušit',
    },

    newCategory: {
      label: 'Název nové kategorie:',
      error: 'Maximální počet kategorii je 6.',
      submit: 'Potvrdit',
      cancel: 'Zrušit',
    },
  },

  table: {
    categoryHeader: 'Kategorie',
    typeHeader: 'Typ',
    nameHeader: 'Název',
    availableCountHeader: 'Na skladě',
    addNewItem: 'Přidat novou položku +',

    filterWithFlag: 'S vlaječkou',
    filterWithComment: 'S komentářem',
    emptyWarehouse: 'Sklad je prázdný',

    amountMenu: {
      modalTitle: 'Množství produktu',
      tabStockIn: 'Naskladnit',
      tabChange: 'Změnit množství',

      submit: 'Potvrdit',
      cancel: 'Zrušit',

      stockIn: {
        title: 'Počet produktu',
        tooltip: 'Zde napište počet produktů, které chcete přidat.',
        error: 'Vstup není číslo.',
      },

      change: {
        title: 'Změnit množství',
        tooltip: 'Nepoužívat pro naskladnění nových produktů',
        error: 'Vstup není číslo.',
      },
    }
  },

  newItemComponent: {
    title: 'Přidat novou položku',
    date: 'Datum',
    itemCategory: 'Kategorie',
    itemType: 'Typ',
    name: 'Název',
    nameError: 'Prosím vložte jméno položky.',
    availableCount: 'Na skladě',
    availableCountError: 'Prosím vložte počet.',
    submit: 'Potvrdit',
    cancel: 'Zrušit',
  },

  graph: {
    title: 'Statistiky kategorie ',

    monthStatsTab: 'Měsíční statistiky',
    monthStatsLabels: ['Na skladě', 'Nakoupeno', 'Prodáno'],
    monthStatsLabel: '# Počet kusů kategorie ',

    monthDetailStatsTab: 'Detailní měsíční statistiky',
    monthDetailStatsInStock: '# Počet kusů na skladě',
    monthDetailStatsPurchased: '# Nakoupený počet kusů',
    monthDetailStatsSold: '# Prodaný počet kusů',
  },
};

/* #endregion */

/* region UI */

export const commentComponent = {
  modalTitle: 'Přidej komentář',
  label: 'Komentář',
  error: 'Tohle pole je povinné.',
  submit: 'Potvrdit',
  cancel: 'Zrušit',
};

export const modalComponent = {
  ok: 'Okay',
};

/* #endregion */
