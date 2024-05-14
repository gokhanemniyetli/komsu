import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');


class KVKKScreen extends Component {

    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                {/* <View style={{ height: 40 }}>
                    <HF_01 title={Localizations('Global.KVKKScreen')} />
                </View> */}
                <ScrollView style={{ margin: 10 }}>

                    <Image
                        style={{ width: 150, height: 48, resizeMode: 'contain', alignSelf: 'center' }}
                        source={require('../images/komsu_pembe_logo.png')}
                    />

                    <Text style={{ marginTop: 10 }}>
KVKK sözleşmesi
</Text>
<Text style={{ marginTop: 10 }}>
 Kişisel Verilerin Korunması Kanunu (“KVKK”)
 </Text>
<Text>
       SWOQY YAZILIM HİZMETLERİ İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ (“SWOQY”) aktarılan kişisel verilerin korunması konusundaki temel bilgilere aşağıda yer verilmiştir. SWOQY, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) m. 10’dan doğan aydınlatma yükümlülüğünü yerine getirmek amacıyla aşağıdaki açıklamaları müşterilerimizin ve web-sitemizi ve/veya mobil uygulamalarımızı kullanan 3. kişilerin dikkatine sunar. SWOQY işbu Kişisel Verilerin Korunması Hakkında Açıklama metnini yürürlükteki mevzuatta yapılabilecek değişiklikler çerçevesinde her zaman güncelleme hakkını saklı tutar.
     </Text>
<Text>
SWOQY YAZILIM HİZMETLERİ İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ
  </Text>
<Text>
SWOQY ile paylaşılan kişisel veriler, SWOQY gözetimi ve kontrolü altındadır. SWOQY, yürürlükteki ilgili mevzuat hükümleri gereğince bilginin gizliliğinin ve bütünlüğünün korunması amacıyla gerekli organizasyonu kurmak ve teknik önlemleri almak ve uyarlamak konusunda veri sorumlusu sıfatıyla sorumluluğu üstlenmiştir. Bu konudaki yükümlülüğümüzün bilincinde olarak veri gizliliğini konu alan uluslararası ve ulusal teknik standartlara uygun surette periyodik aralıklarda sızma testleri yaptırılmakta ve bu kapsamda veri işleme politikalarımızı her zaman güncellediğimizi bilginize sunarız.
 </Text>
<Text style={{ marginTop: 10 }}>
1. Kişisel Verilerin Toplanmasının Yasal Dayanağı
 </Text>
<Text>
Kişisel verileriniz KVKK 5/1, 5/2 ve 6/2 ve 6/3 maddeleri çerçevesinde işlenmektedir.
 </Text>
<Text style={{ marginTop: 10 }}>
2. Kişisel Verilerin Toplanma Yöntemleri
 </Text>
<Text>
Komsu mobil uygulaması ve   www.komsuapp.com internet sitesi aracılığıyla paylaşılan veriler; fiziki ve elektronik ortamda işlenmektedir.
 </Text>
<Text style={{ marginTop: 10 }}>
3. Kişisel Verilerin İşlenme Sebebi
 </Text>
<Text>
Kişisel verileriniz şu amaçlarla kullanılmaktadır:
 </Text>
<Text>
web sitesi/mobil uygulama üzerinden yapılan işlemlerin kimlik bilgilerini teyit etmek,
 </Text>
<Text>
iletişim için adres ve diğer gerekli bilgileri kaydetmek,
 </Text>
<Text>
Tüketicinin Korunması Hakkında Kanun’un ilgili maddeleri tahtında akdettiğimiz sözleşme koşulları, güncel durumu ve güncellemeler ile ilgili müşterilerimiz ile iletişime geçmek, gerekli bilgilendirmeleri yapabilmek,
 </Text>
<Text>
elektronik (internet/mobil vs.) veya kağıt ortamında işleme dayanak olacak tüm kayıt ve belgeleri düzenlemek,
 </Text>
<Text>
mesafeli satış sözleşmesi ve Tüketicinin Korunması Hakkında Kanun’un ilgili maddeleri tahtında akdettiğimiz sözleşmeler uyarınca üstlenilen yükümlülükleri ifa etmek,
 </Text>
<Text>
kamu güvenliğine ilişkin hususlarda talep halinde ve mevzuat gereği kamu görevlilerine bilgi verebilmek,
 </Text>
<Text>
kullanıcılara/müşterilere daha iyi bir alışveriş deneyimini sağlamak, “kullanıcılarımızın/müşterilerimizin ilgi alanlarını dikkate alarak” kullanıcılarımızın/müşterilerimizin ilgilenebileceği ürünlerimiz hakkında kullanıcılarımıza/müşterilerimize bilgi verebilmek, kampanyaları aktarmak,
 </Text>
<Text>
kullanıcı/müşteri memnuniyetini artırmak, mobil uygulamamızı ve web sitemizi kullanan kullanıcılarımızı/müşterilerimizi tanıyabilmek ve müşteri çevresi analizinde kullanabilmek, çeşitli pazarlama ve reklam faaliyetlerinde kullanabilmek ve bu kapsamda anlaşmalı kuruluşlar aracılığıyla elektronik ortamda ve/veya fiziki ortamda anketler düzenlemek,
 </Text>
<Text>
anlaşmalı kurumlarımız ve çözüm ortaklarımız tarafından kullanıcılarımıza/müşterilerimize öneri sunabilmek, hizmetlerimizle ilgili kullanıcılarımızı/müşterilerimizi bilgilendirebilmek,
 </Text>
<Text>
hizmetlerimiz ile ilgili kullanıcı/müşteri şikayet ve önerilerini değerlendirebilmek,
 </Text>
<Text>
yasal yükümlülüklerimizi yerine getirebilmek ve yürürlükteki mevzuattan doğan haklarımızı kullanabilmek,
 </Text>
<Text>
dolandırıcılık ve diğer yasa dışı faaliyetlerin önüne geçebilmek.
 </Text>
<Text style={{ marginTop: 10 }}>
4.Kişisel Verilerinizin Aktarıldığı 3. Kişiler
 </Text>
<Text>
Kullanıcılarımıza/Müşterilerimize ait kişisel verilerin üçüncü kişiler ile paylaşımı, kullanıcıların/müşterilerin izni çerçevesinde gerçekleşmekte ve kural olarak kullanıcılarımızın/müşterimizin onayı olmaksızın kişisel verileri üçüncü kişilere aktarılmamaktadır.
 </Text>
<Text>
Bununla birlikte, yasal yükümlülüklerimiz nedeniyle ve bunlarla sınırlı olmak üzere mahkemeler ve diğer kamu kurumları ile kişisel veriler paylaşılmaktadır. Ayrıca, taahhüt ettiğimiz hizmetleri sağlayabilmek ve verilen hizmetlerin kalite kontrolünü yapabilmek için anlaşmalı üçüncü kişilere kişisel veri aktarımı yapılmaktadır.
 </Text>
<Text>
Kişisel verileriniz SWOQY tarafından yukarıda sayılan işlenme amacı ve sunulan ürün ve hizmetlerden ilgili kişileri faydalandırmak için gerekli çalışmaların iş birimleri tarafından yapılması ve ilgili iş süreçlerinin yürütülmesi, SWOQY tarafından yürütülen ticari faaliyetlerin gerçekleştirilmesi için ilgili iş birimleri tarafından gerekli çalışmaların yapılması ve buna bağlı iş süreçlerinin yürütülmesi, SWOQY’nin ticari ve/veya iş stratejilerinin planlanması ve icrası, SWOQY’nin ve SWOQY ile iş ilişkisi içerisinde olan ilgili kişilerin hukuki, teknik ve ticari-iş güvenliğinin temini ile SWOQY’nin sunduğu ürün ve hizmetlerin ilgili kişilerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek ilgili kişilere önerilmesi ve tanıtılması için gerekli olan aktivitelerin planlanması ve icrası da dahil olmak üzere SWOQY’nin hissedarlarıyla, doğrudan/dolaylı yurtiçi/yurtdışı iştiraklerimize, faaliyetlerimizi yürütebilmek için işbirliği yaptığımız program ortağı kurum, kuruluşlarla, verilerin bulut ortamında saklanması hizmeti aldığımız yurtiçi/yurtdışı kişi ve kurumlarla, kullanıcılarımıza/müşterilerimize ticari elektronik iletilerin gönderilmesi konusunda anlaşmalı olduğumuz yurtiçi/yurtdışındaki kuruluşlarla, Bankalararası Kart Merkeziyle, anlaşmalı olduğumuz bankalarla ve sizlere daha iyi hizmet sunabilmek ve müşteri memnuniyetini sağlayabilmek için çeşitli pazarlama faaliyetleri kapsamında yurtiçi ve yurtdışındaki çeşitli ajans, reklam şirketleri ve anket şirketleriyle ve yurtiçi/yurtdışı diğer üçüncü kişilerle ve ilgili iş ortaklarımızla paylaşılabilmektedir.
</Text>
<Text style={{ marginTop: 10 }}>
    5. Kişisel Verilerin Korunması Kanunu uyarınca kullanıcılarımızın/müşterilerimizin hakları:
 </Text>
<Text>
KVKK uyarınca kişisel verilerinizin;
 </Text>
<Text>
işlenip işlenmediğini öğrenme,
 </Text>
<Text>
işlenmişse bilgi talep etme,
 </Text>
<Text>
işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,
 </Text>
<Text>
yurt içinde / yurt dışında aktarıldığı 3. kişileri bilme,
 </Text>
<Text>
eksik / yanlış işlenmişse düzeltilmesini isteme,
 </Text>
<Text>
KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini / yok edilmesini isteme,
 </Text>
<Text>
aktarıldığı 3. kişilere yukarıda sayılan (d) ve (e) bentleri uyarınca yapılan işlemlerin bildirilmesini isteme,
 </Text>
<Text>
münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,
 </Text>
<Text>
KVKK’ya aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme haklarına sahip olduğunuzu hatırlatmak isteriz.
 </Text>
<Text>
Yukarıda yapılan açıklamalar çerçevesinde ve www.komsuapp.com/kullanim-kosullari.html adresinde yer alan Kullanım Kosşulları dahilinde KVKK’ya uygun olarak SWOQY YAZILIM HİZMETLERİ İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ tarafından kişisel verilerimin toplanmasına, işlenmesine, güncellenmesine, periyodik olarak kontrol edilmesine, veri tabanında tutulmasına ve saklanmasına ve 4. maddede belirtilen kurum ve kuruluşlarla paylaşılmasına ve kişisel verilerimin bunlar tarafından da tutulmasına ve saklanmasına muvafakat ediyorum. İşbu bilgilendirme yazısı, KVKK’nın 10. maddesi uyarınca aydınlatma yükümlülüğünü yerine getirmek üzere hazırlanmıştır.


                    </Text>
                </ScrollView>
            </View>
        )
    }

    //#endregion
}


export default KVKKScreen;
