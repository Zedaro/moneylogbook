//Localization -> Vue I18n
import Vue from "vue";
import VueI18n from "vue-i18n";

const messages = {
    en: {
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
        languages: {
            de: 'Deutsch',
            en: 'English'
        }
    },
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
        formType: {
            moneyAccount: 'Konto-Formular',
            transaction: 'Transaktions-Formular',
            repeatingTransaction: 'Dauerauftrags-Formular',
            transfer: 'Umbuchungs-Formular'
        },
        languages: {
            de: 'Deutsch',
            en: 'English'
        }
    }
}

Vue.use(VueI18n);
export const i18n = new VueI18n({
    locale: 'de', // set locale
    messages, // set locale messages
})