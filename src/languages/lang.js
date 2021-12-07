//Localization -> Vue I18n
import Vue from "vue";
import VueI18n from "vue-i18n";

const messages = {
    de: {
        headerTitle: {
            moneyAccounts: 'Übersicht',
            transactions: 'Transaktionen',
            repeatingTransactions: 'Daueraufträge',
            transfers: 'Umbuchungen',
            new: {
                moneyAccount: 'Neues Konto',
                transaction: 'Neue Transaktion',
                repeatingTransaction: 'Neuer Dauerauftrag',
                transfer: 'Neue Umbuchung'
            },
            edit: {
                moneyAccount: 'Konto bearbeiten',
                transaction: 'Transaktion bearbeiten',
                repeatingTransaction: 'Dauerauftrag bearbeiten',
                transfer: 'Umbuchung bearbeiten'
            }
        },
        /*
        formType: {
            moneyAccount: 'Konto-Formular',
            transaction: 'Transaktions-Formular',
            repeatingTransaction: 'Dauerauftrags-Formular',
            transfer: 'Umbuchungs-Formular'
        },
        */
        totalText: 'Gesamt',
        form: {
            name: 'Name',
            description: 'Beschreibung',
            balance: 'Geldstand',
            money: 'Betrag',
            moneyAccount: 'Konto',
            from: 'Von',
            to: 'Zu',
            date: 'Datum',
            startingDate: 'Erste Ausführung',
            endingDate: 'Letzte Ausführung / Enddatum',
            interval: 'Intervall',
            rhythmNumbers: (ctx) => {
                let every = "";
                if(ctx.named('rhythmTypeIndex') === 0) {
                    every = "Jede ";
                } else if(ctx.named('rhythmTypeIndex') === 1) {
                    every = "Jeden ";
                } else if(ctx.named('rhythmTypeIndex') === 2) {
                    every = "Jedes ";
                }

                const rhythmNumbers = [every];
                for(let i = 2; i <= 12; i++) {
                    rhythmNumbers.push("Alle " + i + ' ');
                }

                return rhythmNumbers;
            },
            rhythmTypes: (ctx) => {
                if(ctx.named('rhythmNumberIndex') === 0) {
                    return [
                        "Woche",
                        "Monat",
                        "Jahr"
                    ];
                } else {
                    return [
                        "Wochen",
                        "Monate",
                        "Jahre"
                    ];
                }
            },
            weekdays: ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'],

        },
        moneyFormat: {
            monetaryUnit: '€',
            format: () => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' })
        }
    },
    "en-US": {
        headerTitle: {
            moneyAccounts: 'Overview',
            transactions: 'Transactions',
            repeatingTransactions: 'Repeating Transactions',
            transfers: 'Transfers',
            new: {
                moneyAccount: 'New Account',
                transaction: 'New Transaction',
                repeatingTransaction: 'New Repeating Transaction',
                transfer: 'New Transfer'
            },
            edit: {
                moneyAccount: 'Edit Account',
                transaction: 'Edit Transaction',
                repeatingTransaction: 'Edit Repeating Transaction',
                transfer: 'Edit Transfer'
            }
        },
        formType: {
            moneyAccount: 'Konto-Formular',
            transaction: 'Transaktions-Formular',
            repeatingTransaction: 'Dauerauftrags-Formular',
            transfer: 'Umbuchungs-Formular'
        },
        totalText: 'Total',
        form: {
            name: 'Name',
            description: 'Description',
            balance: 'Balance',
            money: 'Figure',
            moneyAccount: 'Account',
            from: 'From',
            to: 'To',
            date: 'Date',
            startingDate: 'First Execution / Starting Date',
            endingDate: 'Last Execution / Ending Date (optional)',
            interval: 'Interval',
            rhythmNumbers: () => {
                let every = "Every";

                const rhythmNumbers = [every];
                for(let i = 2; i <= 12; i++) {
                    rhythmNumbers.push("Every " + i + ' ');
                }

                return rhythmNumbers;
            },
            rhythmTypes: (ctx) => {
                if(ctx.named('rhythmNumberIndex') === 0) {
                    return [
                        "week",
                        "month",
                        "year"
                    ];
                } else {
                    return [
                        "weeks",
                        "months",
                        "years"
                    ];
                }
            },
            weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        },
        moneyFormat: {
            monetaryUnit: '$',
            format: () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        }
    },
    /*
    "en-GB": {
        headerTitle: {
            moneyAccounts: 'Overview',
            transactions: 'Transactions',
            repeatingTransactions: 'Repeating Transactions',
            transfers: 'Transfers',
            new: {
                moneyAccount: 'New Account',
                transaction: 'New Transaction',
                repeatingTransaction: 'New Repeating Transaction',
                transfer: 'New Transfer'
            },
            edit: {
                moneyAccount: 'Edit Account',
                transaction: 'Edit Transaction',
                repeatingTransaction: 'Edit Repeating Transaction',
                transfer: 'Edit Transfer'
            }
        },
        formType: {
            moneyAccount: 'Konto-Formular',
            transaction: 'Transaktions-Formular',
            repeatingTransaction: 'Dauerauftrags-Formular',
            transfer: 'Umbuchungs-Formular'
        },
        totalText: 'Total',
        form: {
            name: 'Name',
            description: 'Description',
            money: 'Balance',
            moneyAccount: 'Account',
            from: 'From',
            to: 'To',
            date: 'Date',
            startingDate: 'First Execution / Starting Date',
            endingDate: 'Last Execution / Ending Date (optional)',
            interval: 'Interval',
            weekdays: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
        },
        moneyFormat: {
            monetaryUnit: '£',
            format: () => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' })
        }
    }
    */
}

Vue.use(VueI18n);
export const i18n = new VueI18n({
    locale: 'de', // set locale
    messages, // set locale messages
    fallbackLocale: 'de'
})