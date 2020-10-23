import i18n from "i18next";
import {getCookie, setCookie} from "./CookiesUtils";

export const languages = [
    { lng: 'English', code: 'en' },
    { lng: 'Русский', code: 'ru' }
];

export function getEncodingLocation(lang) {
    if(lang === "ru")
        return [
            {
                name: "Cp437",
                aliases: "437, IBM437",
                lang: "Английский"
            },
            {
                name: "Cp850",
                aliases: "850, IBM850",
                lang: "Латынь"
            },
            {
                name: "Cp852",
                aliases: "852, IBM852",
                lang: "Латынь"
            },
            {
                name: "Cp855",
                aliases: "855, IBM855",
                lang: "Кириллица"
            },
            {
                name: "Cp866",
                aliases: "866, IBM866",
                lang: "Русский"
            },
            {
                name: "windows-1250",
                aliases: "Cp1250 cp1250",
                lang: "Восточно-Европейский"
            },
            {
                name: "windows-1251",
                aliases: "Cp1250 cp1250",
                lang: "Кириллица"
            },
            {
                name: "windows-1252",
                aliases: "Cp1252 cp1252",
                lang: "Латынь"
            },
            {
                name: "ISO-8859-1",
                aliases: "ISO8859_1 l1",
                lang: "Латынь"
            },
            {
                name: "ISO-8859-2",
                aliases: "ISO8859_2 l2",
                lang: "Латынь"
            },
            {
                name: "ISO-8859-5",
                aliases: "ISO8859_5 cyrillic",
                lang: "Кириллица"
            },
            {
                name: "ISO8859_15",
                aliases: "ISO8859_15 LATIN9",
                lang: "Латынь"
            },
            {
                name: "KOI8_R",
                aliases: "KOI8_R koi8_r koi8",
                lang: "Русский"
            },
            {
                name: "KOI8_U",
                aliases: "KOI8_U koi8_u",
                lang: "Украинский"
            },
            {
                name: "UTF-8",
                aliases: "UTF-8, U8, utf8",
                lang: "Все языки"
            },
            {
                name: "UTF-16",
                aliases: "UTF_16 unicode utf16",
                lang: "Все языки"
            },
            {
                name: "UTF-32",
                aliases: "UTF_32 UTF32",
                lang: "Все языки"
            },
        ];
    else
        return [
            {
                name: "Cp437",
                aliases: "437, IBM437",
                lang: "English"
            },
            {
                name: "Cp850",
                aliases: "850, IBM850",
                lang: "Latin"
            },
            {
                name: "Cp852",
                aliases: "852, IBM852",
                lang: "Latin"
            },
            {
                name: "Cp855",
                aliases: "855, IBM855",
                lang: "Cyrillic"
            },
            {
                name: "Cp866",
                aliases: "866, IBM866",
                lang: "Russian"
            },
            {
                name: "windows-1250",
                aliases: "Cp1250 cp1250",
                lang: "Eastern European"
            },
            {
                name: "windows-1251",
                aliases: "Cp1250 cp1250",
                lang: "Cyrillic"
            },
            {
                name: "windows-1252",
                aliases: "Cp1252 cp1252",
                lang: "Latin"
            },
            {
                name: "ISO-8859-1",
                aliases: "ISO8859_1 l1",
                lang: "Latin"
            },
            {
                name: "ISO-8859-2",
                aliases: "ISO8859_2 l2",
                lang: "Latin"
            },
            {
                name: "ISO-8859-5",
                aliases: "ISO8859_5 cyrillic",
                lang: "Cyrillic"
            },
            {
                name: "ISO8859_15",
                aliases: "ISO8859_15 LATIN9",
                lang: "Latin"
            },
            {
                name: "KOI8_R",
                aliases: "KOI8_R koi8_r koi8",
                lang: "Russian"
            },
            {
                name: "KOI8_U",
                aliases: "KOI8_U koi8_u",
                lang: "Ukrainian"
            },
            {
                name: "UTF-8",
                aliases: "UTF-8, U8, utf8",
                lang: "All Languages"
            },
            {
                name: "UTF-16",
                aliases: "UTF_16 unicode utf16",
                lang: "All Languages"
            },
            {
                name: "UTF-32",
                aliases: "UTF_32 UTF32",
                lang: "All Languages"
            },
        ];
}

export function getCalendarLocation(lang) {
    if(lang === "ru") {
        return {
            firstDayOfWeek: 1,
            dayNames: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
            dayNamesShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
            dayNamesMin: ["П", "В", "С", "Ч", "П", "С", "В"],
            monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Нов", "Дек"],
            today: "Сегодня",
            clear: "Очистить",
            weekHeader: "Нд"
        };
    } else return {
        firstDayOfWeek: 0,
        dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
        monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
        today: 'Today',
        clear: 'Clear',
        weekHeader: 'Wk'
    }
}

const resources = {
    en: {
        translation: {
            "clients": "Clients",
            "kick": "Kick",
            "addToTheBlacklist": "Add to the blacklist",
            "copyToClipboard": "Copy IMEI to Clipboard",
            "globalSearch": "Global Search",
            "searchByIMEI": "Search By IMEI",
            "username": "Username",
            "IMEIHash": "IMEI Hash",
            "tokenValidTo": "Token Valid To",
            "actions": "Actions",
            "clientsNotFound": "Clients not found",
            "activeClientsSummary": "Active clients:",
            "from": "",
            "to": "to",
            "of": "of",
            "blacklist": "Blacklist",
            "add": "Add",
            "remove": "Remove",
            "IMEIHashSearch": "IMEI Hash Search",
            "IMEIHashNotFound": "IMEI Hash not found",
            "blacklistSizeSummary": "Blacklist size:",
            "logs": "Logs",
            "type": "Type",
            "message": "Message",
            "selectAType": "Type",
            "searchByMessage": "Search by Message",
            "logsNotFound": "Logs not found",
            "recordsSummary": "Records:",
            "datasource": "Datasource",
            "connection": "Connection",
            "password": "Password",
            "host": "Host",
            "port": "Port",
            "databaseName": "Database Name",
            "databaseType": "Database Type",
            "scriptEncoding": "Script Encoding",
            "driverClassName": "Driver Class Name",
            "additional": "Additional",
            "pool": "Pool",
            "autoCommit": "Auto Commit",
            "autoCommitHint": "Controls the default auto-commit behavior of connections returned from the pool",
            "connectionTimeout": "Connection Timeout",
            "connectionTimeoutHint": "Controls the maximum number of milliseconds that a client will wait for a connection from the pool. Lowest acceptable connection timeout is 250 ms",
            "idleTimeout": "Idle Timeout",
            "idleTimeoutHint": "Controls the maximum amount of time that a connection is allowed to sit idle in the pool. A value of 0 means that idle connections are never removed from the pool. The minimum allowed value is 10000ms (10 seconds)",
            "maxLifeTime": "Max Life Time",
            "maxLifeTimeHint": "Controls the maximum lifetime of a connection in the pool. A value of 0 indicates no maximum lifetime (infinite lifetime), subject of course to the idleTimeout setting. The minimum allowed value is 30000ms (30 seconds)",
            "maximumPoolSize": "Maximum Pool Size",
            "maximumPoolSizeHint": "Controls the maximum size that the pool is allowed to reach, including both idle and in-use connections. Basically this value will determine the maximum number of actual connections to the database backend",
            "applyChangesBtn": "Apply Changes",
            "reset": "Reset",
            "clientTimeoutValue": "Client Timeout, days",
            "clientTimeoutValueHint": "Value '0' means no timeout.",
            "other": "Other",
            "language": "Language",
            "languagePlaceholder": "Select a language",
            "restart": "Restart",
            "restartPage": "Restart page required",
            "settings": "Settings",
            "successful": "Successful",
            "error": "Error",
            "kickRequestFailed": "Kick client request failed: ",
            "addedClientsToTheBlacklist": "Clients added to the blacklist",
            "confirm": "Confrirm",
            "kickClientQuestion": "Are you sure want to kick this client?",
            "kickClientsQuestion": "Are you sure want to kick the selected clients?",
            "addClientBlacklistQuestion": "Are you sure want to add this client to the blacklist?",
            "addClientsBlacklistQuestion": "Are you sure want to add selected clients to the blacklist?",
            "addBlacklistRequestFailed": "Add blacklist request failed: ",
            "removeClientsFromTheBlacklist": "Clients removed from the blacklist",
            "removeClientFromTheBlacklist": "Client removed from the blacklist",
            "removeFromTheBlacklistBtn": "Remove from the blacklist",
            "enterIMEI": "Enter IMEI",
            "enterIMEIOrIMEIHash": "Enter IMEI or IMEI Hash",
            "removeClientsFromTheBlacklistQuestion": "Are you sure want to remove the selected clients from the blacklist?",
            "removeClientFromTheBlacklistQuestion": "Are you sure want to remove this client from the blacklist?",
            "removeByIMEI": "Remove by IMEI",
            "logDateSearch": "Search by Date",
            "search": "Search",
            "pickADate": "Pick a date",
            "restartTime": "Restart in",
            "restartTimeSec": " seconds",
            "imeiCopied": "IMEI is copied",
            "clear": "Clear",
            "changePass": "Change password",
            "change": "Change",
            "enterNewPass": "Enter new password",
            "changePassRequestFailed": "Request failed from changePass",
            "logout": "Logout"
        }
    },
    ru: {
        translation: {
            "clients": "Клиенты",
            "kick": "Исключить",
            "addToTheBlacklist": "Добавить в ЧС",
            "copyToClipboard": "Копировать IMEI",
            "globalSearch": "Глобальный поиск",
            "searchByIMEI": "Поиск по IMEI",
            "username": "Имя Пользователя",
            "IMEIHash": "Хэш IMEI",
            "tokenValidTo": "Токен: годен до",
            "actions": "Действия",
            "clientsNotFound": "Клиенты не найдены",
            "activeClientsSummary": "Активных клиентов:",
            "from": "c",
            "to": "по",
            "of": "из",
            "blacklist": "Черный список",
            "add": "Добавить",
            "remove": "Удалить",
            "IMEIHashSearch": "Поиск Хэш IMEI",
            "IMEIHashNotFound": "Хэш IMEI не найден",
            "blacklistSizeSummary": "Клиентов в черном списке:",
            "logs": "Логи",
            "type": "Тип",
            "message": "Сообщение",
            "selectAType": "Тип",
            "searchByMessage": "Поиск по сообщению",
            "logsNotFound": "Логи не найдены",
            "recordsSummary": "Записей:",
            "datasource": "Источник данных",
            "connection": "Соединение",
            "password": "Пароль",
            "host": "Хост",
            "port": "Порт",
            "databaseName": "Имя Базы Данных",
            "databaseType": "Тип Базы Данных",
            "scriptEncoding": "Кодировка Скрипта",
            "driverClassName": "Имя драйвера класса",
            "additional": "Дополнительно",
            "pool": "Пул",
            "autoCommit": "Авто Коммит",
            "autoCommitHint": "Управляет поведением автоматической фиксации по умолчанию для подключений, возвращаемых с пула",
            "connectionTimeout": "Тайм-аут соединения",
            "connectionTimeoutHint": "Управляет максимальным количеством миллисекунд, в течение которых клиент будет ожидать подключение из пула. Минимальное допустимое время ожидания соединения составляет 250 мс.",
            "idleTimeout": "Время простоя",
            "idleTimeoutHint": "Управляет максимальным временем, в течение которого соединение может простаивать в пуле. Значение 0 означает, что неактивные соединения никогда не удаляются из пула. Минимально допустимое значение - 10000 мс (10 секунд).",
            "maxLifeTime": "Максимальное время жизни",
            "maxLifeTimeHint": "Управляет максимальным временем жизни соединения в пуле. Значение 0 указывает на отсутствие максимального времени жизни (бесконечное время жизни), с учетом настройки времени простоя. Минимально допустимое значение - 30000 мс (30 секунд).",
            "maximumPoolSize": "Максимальный размер пула",
            "maximumPoolSizeHint": "Управляет максимальным размером, который может достигать пул, включая как незанятые, так и используемые соединения. Обычно это значение определяет максимальное количество фактических подключений к бэкэнду базы данных.",
            "applyChangesBtn": "Применить изменения",
            "reset": "Сбросить",
            "clientTimeoutValue": "Тайм-аут клиента, в днях",
            "clientTimeoutValueHint": "Значение '0' означает отсутствие тайм-аута.",
            "other": "Другое",
            "language": "Язык",
            "languagePlaceholder": "Выберите язык",
            "restart": "Перезагрузка",
            "restartPage": "Требуются обновить страницу",
            "settings": "Настройки",
            "successful": "Успех",
            "error": "Ошибка",
            "kickRequestFailed": "Ошибка исключения клиента: ",
            "addedClientsToTheBlacklist": "Клиенты добавлены в черный список",
            "confirm": "Подтвердить",
            "kickClientQuestion": "Вы уверены, что хотите исключить выбранного клиента?",
            "kickClientsQuestion": "Вы уверены, что хотите исключить выбранных клиентов?",
            "addClientBlacklistQuestion": "Вы уверены, что хотите добавить выбранного клиента в черный список?",
            "addClientsBlacklistQuestion": "Вы уверены, что хотите добавить выбранных клиентов в черный список?",
            "addBlacklistRequestFailed": "Ошибка запроса черного списка: ",
            "removeClientsFromTheBlacklist": "Клиенты удалены из черного списка",
            "removeClientFromTheBlacklist": "Клиент удален из черного списка",
            "removeFromTheBlacklistBtn": "Удалить из ЧС",
            "enterIMEI": "Введите IMEI",
            "enterIMEIOrIMEIHash": "Введите IMEI или Хэш IMEI",
            "removeClientsFromTheBlacklistQuestion": "Вы уверены, что хотите удалить выбранных клиентов из черного списка?",
            "removeClientFromTheBlacklistQuestion": "Вы уверены, что хотите удалить выбранного клиента из черного списка?",
            "logDateSearch": "Поиск по Дате",
            "search": "Поиск",
            "pickADate": "Выберите дату",
            "restartTime": "Перезагрузка через",
            "restartTimeSec": " секунд",
            "imeiCopied": "IMEI скопирован в буфер обмена",
            "clear": "Очистить",
            "changePass": "Изменить пароль",
            "change": "Изменить",
            "enterNewPass": "Введите новый пароль",
            "changePassRequestFailed": "Ошибка при отправке команды changePass",
            "logout": "Выход"
        }
    }
};

export function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    setCookie("lang", lang);
}

export function initLanguage(lang) {
    i18n.init({
        resources,
        lng: lang
    });
}

export function getLanguage() {
    if(getCookie("lang") === undefined) {
        setCookie("lang", "en");
    }
    return getCookie("lang");
}