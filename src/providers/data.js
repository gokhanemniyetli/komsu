import SQLite from 'react-native-sqlite-storage';
import WebSQLite from 'websqlite';

const SQLiteManager = new WebSQLite();

export default class Data {

    /**
     *
     */
    init() {
        SQLiteManager.init({
            id: 'swoqy_db',
            dbObject: SQLite,
        })

        // this.seedData();
    }

    /**
     *
     * @param {*} tableName
     * @param {*} columns
     * @param {*} where
     */
    async select(tableName, columns, where) {
        if (where) {
            var whereKey = Object.keys(where)[0]
            var whereValue = where[whereKey]
            return await SQLiteManager.select(tableName, ((columns || columns === "") ? "*" : columns), whereKey + " = ?", [whereValue])
        }
        else {
            return await SQLiteManager.select(tableName, ((columns || columns === "") ? "*" : columns))
        }
    }

    async getViewLocalization(languageID, viewNames) {
        var result = null;
        //debugger;
        if (languageID && viewNames) {
            var strSql = "SELECT rl.LocalizationID, bl.LocalizationName, rl.Text " +
                        " FROM " +
                        "    BAS_Localizations bl INNER JOIN BAS_Views bv ON " +
                        "        bl.ViewID = bv.ViewID " +
                        "    INNER JOIN RES_Localizations rl ON " +
                        "        rl.LocalizationID = bl.LocalizationID " +
                        " WHERE " +
                        "    rl.LanguageID = " + languageID + " AND " +
                        "    bv.ViewName IN (" + viewNames +") "
            result = await SQLiteManager.query(strSql);

        }
        //debugger;
        return result;
    }

    /**
     *
     * @param {*} tableName
     * @param {*} data
     */
    insert(tableName, data) {
        var keys = Object.keys(data)
        var values = keys.map((key) => data[key])
        SQLiteManager.insert(tableName, keys, values)
    }

    /**
     *
     * @param {*} tableName
     * @param {*} data
     * @param {*} where
     */
    update(tableName, data, where) {
        var keys = Object.keys(data)
        var values = keys.map((key) => data[key])

        var whereKey = Object.keys(where)[0]
        var whereValue = where[whereKey]

        SQLiteManager.update(tableName, keys, values, whereKey + " = ?", [whereValue])
    }

    /**
     *
     * @param {*} tableName
     * @param {*} where
     */
    delete(tableName, where) {
        var whereKey = Object.keys(where)[0]
        var whereValue = where[whereKey]

        SQLiteManager.delete(tableName, whereKey + " = ?", [whereValue])
    }

    /**
     *
     * @param {*} query
     */
    executeSQL(query) {
        SQLiteManager.query(query)
    }

    /**
     *
     * @param {*} tableName
     * @param {*} columns
     */
    createTable(tableName, columns) {
        var query = "";
        for (var i = 0; i < columns.length; i++) {
            if (i === columns.length - 1) {
                query += '"' + columns[i].name + '" ' + columns[i].dataType + ' ' + ((columns[i].isNotNull) ? "NOT NULL " : "") + columns[i].options
            } else {
                query += '"' + columns[i].name + '" ' + columns[i].dataType + ' ' + ((columns[i].isNotNull) ? "NOT NULL " : "") + columns[i].options + ','
            }
        }
        this.executeSQL("CREATE TABLE IF NOT EXISTS " + tableName + ' (' + query + ')')
    }


    seedData() {

            // BAS_Languages
            this.createTable("BAS_Languages", [
              {name: 'LanguageID', dataType: 'integer',isNotNull: true, options: 'PRIMARY KEY'},
              {name: 'LanguageName',dataType: 'text'},
              {name: 'LanguageShortName', dataType: 'text'},
              {name: 'DefaultLanguage', dataType: 'integer'}
            ])

            this.insert("BAS_Languages", {LanguageID: 1, LanguageName: 'Türkçe',    LanguageShortName: 'TR', DefaultLanguage: 1});
            this.insert("BAS_Languages", {LanguageID: 2, LanguageName: 'İngilizce', LanguageShortName: 'EN', DefaultLanguage: 0});
            this.insert("BAS_Languages", {LanguageID: 3, LanguageName: 'İtalyance', LanguageShortName: 'IT', DefaultLanguage: 0});

            // BAS_Views
            this.createTable("BAS_Views", [
                {name: 'ViewID', dataType: 'integer', isNotNull: true, options: 'PRIMARY KEY'},
                {name: 'ViewName', dataType: 'text'}
            ])
            this.insert("BAS_Views", {ViewID: 1, ViewName: 'Global'})
            this.insert("BAS_Views", {ViewID: 2, ViewName: 'SignIn'})
            this.insert("BAS_Views", {ViewID: 3, ViewName: 'SignOn'})
            this.insert("BAS_Views", {ViewID: 4, ViewName: 'Home'})
            this.insert("BAS_Views", {ViewID: 5, ViewName: 'Outdoor'})
            this.insert("BAS_Views", {ViewID: 6, ViewName: 'Start'})
            this.insert("BAS_Views", {ViewID: 7, ViewName: 'Account'})

            // BAS_Localizations
            this.createTable("BAS_Localizations", [
                {name: 'LocalizationID', dataType: 'integer', isNotNull: true, options: 'PRIMARY KEY'},
                {name: 'ViewID', dataType: 'integer'},
                {name: 'LocalizationName', dataType: 'text'}
            ])
            this.insert("BAS_Localizations", {LocalizationID: 1, ViewID: 2, LocalizationName: 'Email'})
            this.insert("BAS_Localizations", {LocalizationID: 2, ViewID: 2, LocalizationName: 'Password'})
            this.insert("BAS_Localizations", {LocalizationID: 3, ViewID: 2, LocalizationName: 'ForgotPassword'})
            this.insert("BAS_Localizations", {LocalizationID: 4, ViewID: 2, LocalizationName: 'SingIn'})
            this.insert("BAS_Localizations", {LocalizationID: 5, ViewID: 2, LocalizationName: 'NewAccount'})
            this.insert("BAS_Localizations", {LocalizationID: 6, ViewID: 2, LocalizationName: 'NoSignIn'})
            this.insert("BAS_Localizations", {LocalizationID: 8, ViewID: 2, LocalizationName: 'ConnectWithFacebook'})
            this.insert("BAS_Localizations", {LocalizationID: 9, ViewID: 2, LocalizationName: 'ConnectWithTwitter'})
            this.insert("BAS_Localizations", {LocalizationID: 10, ViewID: 2, LocalizationName: 'SwoqyLogo'})
            this.insert("BAS_Localizations", {LocalizationID: 11, ViewID: 1, LocalizationName: 'ConnectionError'})
            this.insert("BAS_Localizations", {LocalizationID: 12, ViewID: 2, LocalizationName: 'FacebookUserError'})
            this.insert("BAS_Localizations", {LocalizationID: 13, ViewID: 2, LocalizationName: 'IncorrectEmailOrPassword'})
            this.insert("BAS_Localizations", {LocalizationID: 14, ViewID: 2, LocalizationName: 'YouCanEmailAndPassword'})
            this.insert("BAS_Localizations", {LocalizationID: 15, ViewID: 1, LocalizationName: 'Processing'})
            this.insert("BAS_Localizations", {LocalizationID: 17, ViewID: 7, LocalizationName: 'FirstName'})
            this.insert("BAS_Localizations", {LocalizationID: 18, ViewID: 7, LocalizationName: 'LastName'})
            this.insert("BAS_Localizations", {LocalizationID: 19, ViewID: 7, LocalizationName: 'Gender'})
            this.insert("BAS_Localizations", {LocalizationID: 20, ViewID: 7, LocalizationName: 'Information'})
            this.insert("BAS_Localizations", {LocalizationID: 23, ViewID: 7, LocalizationName: 'UserAgreement'})
            this.insert("BAS_Localizations", {LocalizationID: 24, ViewID: 7, LocalizationName: 'Birthdate'})
            this.insert("BAS_Localizations", {LocalizationID: 25, ViewID: 7, LocalizationName: 'Save'})
            this.insert("BAS_Localizations", {LocalizationID: 26, ViewID: 7, LocalizationName: 'UserInformation'})
            this.insert("BAS_Localizations", {LocalizationID: 27, ViewID: 7, LocalizationName: 'Email'})
            this.insert("BAS_Localizations", {LocalizationID: 28, ViewID: 7, LocalizationName: 'PhoneNumber'})
            this.insert("BAS_Localizations", {LocalizationID: 30, ViewID: 7, LocalizationName: 'PhoneNumberRegEx'})


            //RES_Localization
            this.createTable("RES_Localizations", [
                {name: 'ResID', dataType: 'integer', isNotNull: true, options: 'PRIMARY KEY'},
                {name: 'LanguageID', dataType: 'integer'},
                {name: 'LocalizationID', dataType: 'integer'},
                {name: 'Text', dataType: 'text'}
            ])


            this.insert("RES_Localizations", {ResID: 1, LanguageID: 1, LocalizationID: 1, Text: 'Email'})
            this.insert("RES_Localizations", {ResID: 2, LanguageID: 1, LocalizationID: 2, Text: 'Şifre'})
            this.insert("RES_Localizations", {ResID: 3, LanguageID: 1, LocalizationID: 3, Text: 'Şifremi unuttum'})
            this.insert("RES_Localizations", {ResID: 4, LanguageID: 1, LocalizationID: 4, Text: 'Giriş'})
            this.insert("RES_Localizations", {ResID: 5, LanguageID: 1, LocalizationID: 5, Text: 'Yeni Hesap Oluştur'})
            this.insert("RES_Localizations", {ResID: 6, LanguageID: 1, LocalizationID: 6, Text: 'Üye olmadan devam et'})
            this.insert("RES_Localizations", {ResID: 7, LanguageID: 1, LocalizationID: 8, Text: '../images/facebooklogin.png'})
            this.insert("RES_Localizations", {ResID: 8, LanguageID: 1, LocalizationID: 9, Text: '../images/googlelogin.png'})
            // this.insert("RES_Localizations", {ResID: 10, LanguageID: 1, LocalizationID: 10, Text: '../images/swoqy_pembe_logo_kucuk.png'})
            this.insert("RES_Localizations", {ResID: 12, LanguageID: 2, LocalizationID: 1, Text: 'Email'})
            this.insert("RES_Localizations", {ResID: 13, LanguageID: 2, LocalizationID: 2, Text: 'Password'})
            this.insert("RES_Localizations", {ResID: 14, LanguageID: 2, LocalizationID: 3, Text: 'Forgot password'})
            this.insert("RES_Localizations", {ResID: 15, LanguageID: 2, LocalizationID: 4, Text: 'Sing In'})
            this.insert("RES_Localizations", {ResID: 16, LanguageID: 2, LocalizationID: 5, Text: 'New Account'})
            this.insert("RES_Localizations", {ResID: 17, LanguageID: 2, LocalizationID: 6, Text: 'Continue without membership'})
            this.insert("RES_Localizations", {ResID: 19, LanguageID: 2, LocalizationID: 8, Text: '../images/facebooklogin.png'})
            this.insert("RES_Localizations", {ResID: 20, LanguageID: 2, LocalizationID: 9, Text: '../images/googlelogin.png'})
            // this.insert("RES_Localizations", {ResID: 21, LanguageID: 2, LocalizationID: 10, Text: '../images/swoqy_pembe_logo_kucuk.png'})
            this.insert("RES_Localizations", {ResID: 22, LanguageID: 1, LocalizationID: 11, Text: 'Sunucuya bağlantı sırasında hata oluştu.'})
            this.insert("RES_Localizations", {ResID: 24, LanguageID: 1, LocalizationID: 12, Text: 'Facebook bağlantısında hata oluştu.'})
            this.insert("RES_Localizations", {ResID: 25, LanguageID: 1, LocalizationID: 13, Text: 'Hatalı email ya da şifre.'})
            this.insert("RES_Localizations", {ResID: 26, LanguageID: 1, LocalizationID: 14, Text: 'Email ve şifrenizi girmelisiniz.'})
            this.insert("RES_Localizations", {ResID: 27, LanguageID: 2, LocalizationID: 11, Text: 'Server connection error.'})
            this.insert("RES_Localizations", {ResID: 28, LanguageID: 2, LocalizationID: 12, Text: 'Facebook connection error.'})
            this.insert("RES_Localizations", {ResID: 29, LanguageID: 2, LocalizationID: 13, Text: 'Incorrect email or password.'})
            this.insert("RES_Localizations", {ResID: 30, LanguageID: 2, LocalizationID: 14, Text: 'Enter email or password.'})
            this.insert("RES_Localizations", {ResID: 31, LanguageID: 1, LocalizationID: 15, Text: 'İşleminiz gerçekleştiriliyor.'})
            this.insert("RES_Localizations", {ResID: 32, LanguageID: 2, LocalizationID: 15, Text: 'Processing.'})
            this.insert("RES_Localizations", {ResID: 33, LanguageID: 1, LocalizationID: 17, Text: 'Ad'})
            this.insert("RES_Localizations", {ResID: 34, LanguageID: 1, LocalizationID: 18, Text: 'Soyad'})
            this.insert("RES_Localizations", {ResID: 35, LanguageID: 1, LocalizationID: 19, Text: 'Cinsiyet'})
            this.insert("RES_Localizations", {ResID: 37, LanguageID: 1, LocalizationID: 20, Text: 'Bilgilendirme mesaji almak ister misiniz?'})
            this.insert("RES_Localizations", {ResID: 38, LanguageID: 1, LocalizationID: 23, Text: 'Kullanıcı kullanım sözleşmesi'})
            this.insert("RES_Localizations", {ResID: 39, LanguageID: 1, LocalizationID: 24, Text: 'Doğum tarihi'})
            this.insert("RES_Localizations", {ResID: 40, LanguageID: 2, LocalizationID: 17, Text: 'Name'})
            this.insert("RES_Localizations", {ResID: 41, LanguageID: 2, LocalizationID: 18, Text: 'Surname'})
            this.insert("RES_Localizations", {ResID: 42, LanguageID: 2, LocalizationID: 19, Text: 'Cinsiyet'})
            this.insert("RES_Localizations", {ResID: 43, LanguageID: 2, LocalizationID: 20, Text: 'Do you want to information messages?'})
            this.insert("RES_Localizations", {ResID: 45, LanguageID: 2, LocalizationID: 23, Text: 'User agreement'})
            this.insert("RES_Localizations", {ResID: 46, LanguageID: 2, LocalizationID: 24, Text: 'Birthdate'})
            this.insert("RES_Localizations", {ResID: 47, LanguageID: 1, LocalizationID: 25, Text: 'Kaydet'})
            this.insert("RES_Localizations", {ResID: 48, LanguageID: 2, LocalizationID: 25, Text: 'Save'})
            this.insert("RES_Localizations", {ResID: 49, LanguageID: 1, LocalizationID: 26, Text: 'KULLANICI BİLGİLERİ'})
            this.insert("RES_Localizations", {ResID: 50, LanguageID: 2, LocalizationID: 26, Text: 'USER INFORMATION'})
            this.insert("RES_Localizations", {ResID: 51, LanguageID: 1, LocalizationID: 27, Text: 'Email'})
            this.insert("RES_Localizations", {ResID: 52, LanguageID: 2, LocalizationID: 27, Text: 'Email'})
            this.insert("RES_Localizations", {ResID: 53, LanguageID: 1, LocalizationID: 28, Text: 'Telefon numarası'})
            this.insert("RES_Localizations", {ResID: 54, LanguageID: 2, LocalizationID: 28, Text: 'Phone Number'})
            this.insert("RES_Localizations", {ResID: 55, LanguageID: 1, LocalizationID: 30, Text: '+90 5-- --- -- --'})
            this.insert("RES_Localizations", {ResID: 56, LanguageID: 2, LocalizationID: 30, Text: '+-- --- --- -- --'})


            //alert("veri tabanına kayıt aktarıldı");
        }

}
