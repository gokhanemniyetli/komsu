import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');


class ElectronicMessageScreen extends Component {

    render() {
        return (
            <View style={{backgroundColor:'white', flex:1 }}>
                {/* <View style={{ height: 40 }}>
                    <HF_01 title={Localizations('Global.ElectronicMessageScreen')} />
                </View> */}
                <ScrollView style={{ margin: 10}}>
                <Image
                        style={{ width: 150, height: 48, resizeMode: 'contain', alignSelf: 'center' }}
                        source={require('../images/komsu_pembe_logo.png')}
                    />

                    <Text style={{ marginTop: 10 }}>
                        TİCARİ İLETİŞİM VE TİCARİ ELEKTRONİK İLETİ ONAY FORMU
                    </Text>
                    <Text>
                    Bu formun onaylanması ile 6563 Sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve 15 Temmuz 2015 tarihli 29417 sayılı Resmi Gazetede yayınlanan Ticari İletişim ve Ticari Elektronik İletiler Hakkında Yönetmelik kapsamında SWOQY YAZILIM HİZMETLERİ İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ tarafından veya bir aracı firma vasıtasıyla tarafınıza Komsu uygulaması ve www.komsuapp.com 
                    adresli web sitesinde sunulan ürünlere ilişkin mobil uygulama, web sitesi, telefon, çağrı merkezleri, faks, otomatik arama makineleri, akıllı ses kaydedici sistemler, elektronik posta, kısa mesaj hizmeti gibi vasıtalar 
                    kullanılarak elektronik ortamda gerçekleştirilen ve ticari amaçlarla gönderilen veri, ses ve görüntü içerikli her türlü ticari elektronik ileti ile yapılacak tüm tanıtım, kampanya ve bilgilendirme mesajı gönderimini kabul etmektesiniz. 
                    Komsu tarafından gönderilen iletilerde bu hususta belirtilen yöntemle gönderim listesinden kolayca ve ücretsiz olarak çıkabilirsiniz.
                    </Text>
                </ScrollView>
            </View>
        )
    }

    //#endregion
}


export default ElectronicMessageScreen;
