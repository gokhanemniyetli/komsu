import _ from 'lodash'
import React, { Component } from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { Localizations, FormatDate } from '../../locales/i18n';
import { HF_11, HF_10, HF_01, HF_00 } from '../common/HF';

const GLOBAL = require('../common/Globals');
const { container, textStyle, imageStyle } = require('../styles/SwoqyStyles');


class EULAScreen extends Component {

    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                {/* <View style={{ height: 40 }}>
                    <HF_01 title={Localizations('Global.EULAScreen')} />
                </View> */}
                <ScrollView style={{ margin: 10 }}>
                    <Image
                        style={{ width: 150, height: 48, resizeMode: 'contain', alignSelf: 'center' }}
                        source={require('../images/komsu_pembe_logo.png')}
                    />

                    <Text style={{ marginTop: 10 }}>
                        KULLANICI, UYGULAMADA YER ALAN HİZMETLERDEN FAYDALANABİLMEK İÇİN AŞAĞIDA YER ALAN KOMSU ÜYELİK SÖZLEŞMESİNİ KABUL ETMELİDİR.
                    </Text>

                    <Text style={{ marginTop: 10 }}>
                        KOMSU MOBİL UYGULAMASINDA YER ALAN TÜM HİZMETLER SANAL PLATFORM YER SAĞLAYICI SIFATIYLA SWOQY YAZILIM HİZMETLERİ İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ TARAFINDAN SUNULMAKTADIR.
                    </Text>

                    <Text style={{ marginTop: 10 }}>
                        İşbu Kullanıcı Sözleşmesi (“Sözleşme”), www.komsuapp.com websitesi ve uygulamasında sunulan hizmetlerden faydalanabilmeniz ve kullanabilmeniz için gerekli kuralları içermektedir. Websitesi ve uygulamanın kullanılması bu hükümlerin peşinen beyan, kabul ve taahhüt edildiği anlamına gelir.
                    </Text>
                    <Text style={{ marginTop: 10 }}>
                        1.TARAFLAR
                    </Text>
                    <Text >
                        İşbu Sözleşme 5651 sayılı İnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun uyarınca yer sağlayıcı, Elektronik Ticarette Hizmet Sağlayıcı ve Aracı Hizmet Sağlayıcılar Hakkında Yönetmelik uyarınca aracı 
                        yer sağlayıcı sıfatına haiz SWOQY YAZILIM HİZMETLERİ İTHALAT İHRACAT SANAYİ VE TİCARET LİMİTED ŞİRKETİ'ne (Swoqy) ait http://www.komsuapp.com web sitesine ve/veya uygulamasına işbu, Sözleşme’de belirtilen koşullar dahilinde, kayıt olan 
                        gerçek kişi ile SWOQY arasında, elektronik ortamda onay anında karşılıklı olarak kabul edilerek yürürlüğe girmiştir. Kullanıcı, işbu Sözleşme’nin tamamını okuduğunu, 
                        içeriğini bütünü ile anladığını ve tüm hükümlerini onayladığını kabul, beyan ve taahhüt eder. Kullanıcı, ayrıca işbu Sözleşme’nin ayrılmaz bir parçasını oluşturan KİŞİSEL VERİLERİN KORUNMASI HAKKINDA AÇIKLAMA VE GİZLİLİK POLİTİKASI’nın 
                        tamamını okuduğunu, içeriğini bütünü ile anladığını ve tüm hükümlerini onayladığını kabul, beyan ve taahhüt eder.
                    </Text>

                    <Text style={{ marginTop: 10 }}>
                        2. TANIMLAR
                    </Text>
                    <Text>
                        Platform: www.komsuapp.com isimli websitesi ve Komsu mobil uygulamasını,
                        </Text>
                    <Text>
                        Kullanıcı: Platform’a üye olan ve Platform’da sunulan Hizmet'lerden, işbu Sözleşme’de belirtilen koşullar dahilinde yararlanan, tacir, esnaf, tedarikçi, üretici, ticari işletme, ticaret şirketi ve her halükarda satış işlemini meslek olarak edinmemiş ve tüzel kişi sıfatıyla bu gruba mensup olmayan herhangi bir gerçek kişiyi ifade etmektedir.
                    </Text>

                    <Text style={{ marginTop: 10 }}>
                        3. SÖZLEŞMENİN KONUSU VE KAPSAMI
                    </Text>
                    <Text>
                        3.1. İşbu Sözleşme'nin konusu, Platform'da sunulan Hizmet'in, Hizmet’ten yararlanma şartlarının ve Kullanıcı ile SWOQY’nin karşılıklı hak ve yükümlülüklerinin tespitidir.
                    </Text>
                    <Text>
                        3.2. Kullanıcı, Kullanıcı Sözleşmesi'nin hükümlerini kabul etmekle, Platform içinde yer alan, kullanıma, üyeliğe ve Hizmet'e ilişkin olarak SWOQY tarafından açıklanan her türlü beyanı ve bu beyanlara uygun davranacağını kabul etmiş olmaktadır. SWOQY, dilediği zaman Hizmet'te değişiklikler ve/veya uyarlamalar yapabilir. SWOQY tarafından yapılan bu değişiklikler ve/veya uyarlamalarla ilgili olarak Kullanıcı'ların uymakla yükümlü olduğu kural ve koşullar, SWOQY tarafından Platform’da ilan edilerek Kullanıcı'lara duyurulur ve ilan edildiği tarihten itibaren de bağlayıcı olacaktır.
    </Text>
                    <Text style={{ marginTop: 10 }}>
                        4. ÜYELİK VE HİZMET KULLANIMI ŞARTLARI
    </Text>
                    <Text>
                        4.1. Üyelik, Platform'un ilgili bölümünden, Kullanıcı olmak isteyen gerçek kişi tarafından Platform'a Kullanıcı olmak için gerekli bilgilerin gönderilmesi suretiyle kayıt işleminin yaptırılması ve SWOQY tarafından kayıt işleminin onaylanması ile tamamlanır. Üyelik işlemi tamamlanmadan, işbu Kullanıcı Sözleşmesi'nde tanımlanan Kullanıcı olma hak ve yetkisine sahip olunamaz.
    </Text>
                    <Text>
                        4.2. Kullanıcı olabilmek için, 18 (onsekiz) yaşını doldurmak ve SWOQY tarafından, Sözleşme hükümleri kapsamında geçici olarak üyelikten uzaklaştırılmış veya üyelikten süresiz olarak yasaklanmış olmamak gerekmektedir. 18 (Onsekiz) yaşını doldurmayan ve/veya SWOQY tarafından herhangi bir sebeple geçici olarak üyelikten uzaklaştırılmış veya üyeliği süresiz olarak yasaklanmış olan kişilerin başvuruları Kullanıcı olarak sayılmaları sonucunu doğurmayacaktır, bu durumun SWOQY tarafından tespit edilmesi halinde bu kişilerin üyelikleri SWOQY tarafından iptal edilecektir.
        </Text>
                    <Text>
                        4.3 Komsu mobil uygulaması veya www.komsuapp.com web sitesini kullanan bütün kullanıcıların konumu bilgisi alınmakta, saklanmakta ve uygulama üzerinden diğer kullanıcılar ile paylaşılmaktadır.</Text>
                        <Text>
                        4.4 Müstehcenlik, şiddet, yıkıcılık, ırkçılık, saldırganlık, küfür içeren resim, yazı, videoların paylaşımının yapılması yasaktır. Bu paylaşımlar, paylaşımları yapan kişilerin sorumluluğundadır. Bu tarz sakıncalı içerikler tespit edildiklerinde heber vermeksizin mobil uygulamadan ve web sitesinden kaldırılacaktır. 
                        </Text>
                   
                    <Text style={{ marginTop: 10 }}>
                        5. KULLANICI'NIN HAK VE YÜKÜMLÜLÜKLERİ
</Text>
                    <Text>
                        5.1. Kullanıcı, üyelik prosedürlerini yerine getirirken, Hizmet'ten faydalanırken ve Hizmet'le ilgili herhangi bir işlemi yerine getirirken, Sözleşme'de yer alan tüm şartlara, Platform'dan duyurulan ve/veya ileride herhangi bir zamanda duyurulacak olan kurallara ve mevzuata uygun hareket edeceğini kabul, beyan ve taahhüt eder.
    </Text>
                    <Text>
                        5.2. Kullanıcı, yürürlükteki emredici mevzuat hükümleri gereğince veya 3. kişilerin herhangi bir hakkının ihlal edildiğinin SWOQY tarafından tespit edilmesi ve/veya 3. kişiler tarafından herhangi bir surette bu durumun ortaya konulması halinde SWOQY'nin kişisel bilgileri gerek resmi makamlara ve gerekse hak sahibi kişilere açıklamaya yetkili olacağını ve bu sebeple SWOQY'den her ne nam altında olursa olsun talepte bulunmayacağını peşinen kabul, beyan ve taahhüt eder.
    </Text>
                    <Text>
                        5.3. Kullanıcı'nın Hizmet’ten yararlanabilmek amacıyla kullandığı sisteme erişim araçlarının (Kullanıcı ismi, şifre vb.) güvenli şekilde saklanması münhasıran Kullanıcı’nın sorumluluğundadır. Kullanıcı bu bilgilerin herhangi bir şekilde izinsiz 3. kişilerin eline geçmesi halinde SWOQY’nin herhangi bir sorumluluğu olmadığını/olmayacağını kabul, beyan ve taahhüt eder.
    </Text>
                    <Text>
                        5.4. Kullanıcı, Platform dahilinde kendisi tarafından sağlanan bilgi ve içeriklerin doğru ve hukuka uygun olduğunu kabul, beyan ve taahhüt eder. SWOQY, yer sağlayıcı ve aracı hizmet sağlayıcı sıfatına istinaden, Kullanıcı tarafından SWOQY'ye iletilen veya Platform üzerinde Kullanıcı tarafından yüklenen, değiştirilen veya sağlanan bilgi ve içeriklerin doğruluğunu araştırmakla, bu bilgi ve içeriklerin güvenli, doğru ve hukuka uygun olduğunu taahhüt ve garanti etmekle yükümlü ve sorumlu olmadığı gibi söz konusu bilgi ve içeriklerin yanlış veya hatalı olmasından dolayı ortaya çıkacak hiçbir zarardan da sorumlu tutulamaz.
        </Text>
                    <Text>
                        5.5. Kullanıcı'lar da dahil olmak üzere, üçüncü kişiler tarafından Platform'da sağlanan hizmetlerden ve/veya yayınlanan içeriklerden dolayı, yer sağlayıcı ve aracı hizmet sağlayıcı konumunda olan SWOQY'nin, SWOQY çalışanlarının veya yöneticilerinin hiçbir sorumluluğu bulunmamaktadır. Herhangi bir üçüncü kişi tarafından sağlanan ve yayınlanan bilgilerin, içeriklerin, görsel ve işitsel imgelerin doğruluğu ve hukuka uygunluğunun taahhüdü, bütünüyle bu eylemleri gerçekleştiren kişilerin sorumluluğundadır. SWOQY, Kullanıcı'lar da dahil olmak üzere üçüncü kişiler tarafından sağlanan hizmetlerin ve içeriklerin hiçbir surette güvenliğini, doğruluğunu ve hukuka uygunluğunu taahhüt ve garanti etmemektedir.
        </Text>
                    <Text>
                        5.6. Hizmet’ten yararlananlar ve Platform'u kullananlar, yalnızca hukuka uygun amaçlarla Platform üzerinde işlem yapabilirler. Kullanıcı'nın, Platform dahilinde yaptığı her işlem ve eylemdeki hukuki ve cezai sorumluluk kendisine aittir. Kullanıcı, Platform dahilinde bulunan resimleri, metinleri, görsel ve işitsel imgeleri, video kliplerini, dosyaları, veritabanlarını, katalogları ve listeleri; SWOQY ve/veya başka bir üçüncü şahsın ayni veya şahsi haklarına veya malvarlığına tecavüz teşkil edecek şekilde çoğaltmayacağını, kopyalamayacağını, dağıtmayacağını, işlemeyeceğini ve herhangi bir yolla umuma iletmeyeceğini gerek bu eylemleri ile gerekse de başka yollarla SWOQY ile doğrudan ve/veya dolaylı olarak rekabete girmeyeceğini kabul, beyan ve taahhüt eder. SWOQY, Kullanıcı'nın işbu Sözleşme hükümlerine ve/veya hukuka aykırı olarak Platform üzerinde gerçekleştirdikleri faaliyetler nedeniyle üçüncü kişilerin uğradıkları veya uğrayabilecekleri zararlardan doğrudan ve/veya dolaylı olarak, hiçbir şekilde sorumlu tutulamaz. Aksi halde SWOQY uğradığı/uğrayabileceği her türlü zararı rücu etme hakkına sahiptir.
        </Text>
                    <Text>
                        5.7. Kullanıcı diğer Kullanıcı’ların erişimine açık alanlarda veya özel mesajlaşmalarda kullandığı her türlü küfür, hakaret, müstehcenlik içeren ve bunlarla sınırlı olmamak üzere hukuka aykırı her türlü yorum, ilan, açıklama ve paylaşım nedeniyle hukuken sorumlu olacağını bildiğini kabul, beyan ve taahhüt eder.
        </Text>
                    <Text>
                        5.8. Kullanıcı, SWOQY'nin yazılı onayı olmadan, Kullanıcı Sözleşmesi kapsamındaki hak ve yükümlülüklerini, üyeliğini kısmen veya tamamen, herhangi bir üçüncü kişiye devredemez.
      </Text>
                    <Text>
                        5.9. SWOQY, Kullanıcı’ya kendi onayı doğrultusunda, SWOQY tarafından kendi adına veya işbirliği içinde bulunduğu 3 kişilerle ilgili yapılacak tanıtım ve bilgilendirme mesajlarını alma imkanı sağlamaktadır. Kullanıcı, Platform’daki ayarlar bölümünde bilgilendirme ve tanıtım mesajlarının alınması ile ilgili değişiklik yapma ve mesaj gönderimini onaylama/engelleme hakkına sahiptir.
    </Text>
                    <Text>
                        5.10. Kullanıcı, Platform’daki başka bir Kullanıcı ile arasındaki her türlü anlaşmazlık, dava ve talepten SWOQY’nin herhangi bir sorumluluğu olmayacağını kabul, beyan ve taahhüt eder.
    </Text>
                    <Text>
                        5.11. Kullanıcı’nın işbu Sözleşmede yer alan herhangi bir hükme aykırılığı halinde SWOQY’nin herhangi bir zarara uğraması durumunda, SWOQY’nin doğmuş zararını derhal tazmin edeceğini; kabul, beyan ve taahhüt eder.
    </Text>
                    <Text>
                        5.12. Kullanıcı'nın, Platform'a Kullanıcı olurken sisteme yükledikleri "kullanıcı isimleri" işbu Kullanıcı Sözleşmesi içinde yer alan hükümlere tabi olup, Kullanıcı'ların "kullanıcı ismi" veya "SWOQY" ismi belirlerken üçüncü şahısların telif hakkı, marka, ticari unvan gibi yasal haklarını ihlal etmemesi gerekmektedir. Kullanıcı'nın işbu madde hükmüne aykırı davranması durumunda, SWOQY Kullanıcı Sözleşmesi'ne aykırı bu durumun düzeltilmesini Kullanıcı'dan talep edebileceği gibi dilerse Kullanıcı'ya önceden haber vermeksizin Kullanıcı'nın üyeliğini geçici olarak durdurabilir veya kalıcı olarak iptal edebilir.
        </Text>
                    <Text>
                        5.13. Kullanıcı Platform üzerinde; ‘site dışına yönlendirici’ hiçbir URL adresi (link) paylaşamaz. Bunun tespiti halinde, SWOQY’nin insiyatifinde olacak şekilde; üyelik askıya alınabilir, sonlandırılabilir ya da ilgili link kaldırılabilir.
     </Text>
                    <Text>
                        5.14. Kullanıcı'lar, SWOQY tarafından Platform'da belirtilen kuralları veya Kullanıcı Sözleşmesi'nin hükümlerini ihlal ettikleri takdirde, SWOQY tarafından Kullanıcı’nın üyeliği askıya alınabilir ya da sonlandırılabilir.
   </Text>
                    <Text style={{ marginTop: 10 }}>
                        6. SWOQY’NİN HAK VE YÜKÜMLÜLÜKLERİ
    </Text>
                    <Text>
                        6.1. SWOQY, Hizmet’i ve içerikleri her zaman değiştirebilme; Kullanıcı'nın sisteme yükledikleri bilgileri ve içerikleri, Kullanıcı da dahil olmak üzere, üçüncü kişilerin erişimine kapatabilme ve silme hakkını saklı tutmaktadır. SWOQY, bu hakkını, hiçbir bildirimde bulunmadan vermeden kullanabilir. Kullanıcı, SWOQY’nin talep ettiği değişiklik ve/veya düzeltmeleri ivedi olarak yerine getirmek zorundadır. SWOQY tarafından talep edilen değişiklik ve/veya düzeltme istekleri, gerekli görüldüğü takdirde, SWOQY tarafından doğrudan yapılabilir. SWOQY tarafından talep edilen değişiklik ve/veya düzeltme taleplerinin Kullanıcı tarafından zamanında yerine getirilmemesi sebebiyle doğan veya doğabilecek zararlar, hukuki ve cezai sorumluluklar tamamen Kullanıcı'ya aittir.
        </Text>
                    <Text>
                        6.2. SWOQY, Platform üzerinden, SWOQY’nin kendi kontrolünde olmayan üçüncü kişi satıcılar, sağlayıcılar ve başkaca üçüncü kişilerin sahip olduğu ve işlettiği başka web sitelerine ve/veya portallara, dosyalara veya içeriklere URL adresi/ 'link' verebilir. Bu 'link'ler, web sitesini veya Platform’u işleten kişiyi desteklemek amacı veya web sitesi veya içerdiği bilgilere yönelik herhangi bir türde bir beyan veya garanti niteliği taşımamaktadır. Platform üzerindeki 'link'ler vasıtasıyla erişilen portallar, web siteleri, dosyalar ve içerikler, bu 'link'ler vasıtasıyla erişilen portallar veya web sitelerinden sunulan hizmetler veya ürünler veya bunların içeriği hakkında SWOQY’nin herhangi bir sorumluluğu yoktur.
        </Text>
                    <Text>
                        6.3. SWOQY, Hizmet ile ilgili olarak Kullanıcı'lar arasında ortaya çıkan uyuşmazlıklarda, arabulucu veya hakem sıfatlarıyla görev almaz.
        </Text>
                    <Text>
                        6.4. Kullanıcı, Platform’u aşağıda sayılan haller başta olmak üzere hukuka ve ahlaka aykırı bir şekilde kullanmayacaktır.
        </Text>
                    <Text>
                        - Platform’un herhangi bir kişi adına veri tabanı, kayıt veya rehber yaratmak, kontrol etmek, güncellemek veya değiştirmek amacıyla kullanılması;
        </Text>
                    <Text>
                        - Platform‘un bütününün veya bir bölümünün bozma, değiştirme veya ters mühendislik yapma amacıyla kullanılması;
        </Text>
                    <Text>
                        - Yanlış bilgiler veya başka bir kişinin bilgileri kullanılarak işlem yapılması, yanlış veya yanıltıcı ikametgâh adresi, elektronik posta adresi, iletişim, ödeme veya hesap bilgileri de dahil yanlış veya yanıltıcı kişisel veriler kullanmak suretiyle gerçek olmayan Üyelik hesapları oluşturulması ve bu hesapların Sözleşme’ye veya yürürlükte mevzuata aykırı şekilde kullanılması, başka bir Kullanıcı‘nın hesabının izinsiz kullanılması, başka birinin yerine geçilerek ya da yanlış bir isimle işlemlere taraf ya da katılımcı olunması;
    </Text>
                    <Text>
                        - Yorum ve puanlama sistemlerinin; Platform’daki yorumları Platform dışında yayınlamak gibi Platform dışı amaçlar için kullanılması veya sistemleri manipüle edecek şekilde kullanılma amaçları dışında kullanılması;
        </Text>
                    <Text>
                        - Virüs veya Platform‘a, Platform’un veri tabanına, Platform üzerinde yer alan herhangi bir içeriğe zarar verici herhangi başka bir teknoloji yayılması;
        </Text>
                    <Text>
                        - Platform tarafından belirlenmiş olan iletişimler ve teknik sistemler üzerinde makul olmayan veya orantısız derecede büyük yüklemeler yaratacak ya da teknik işleyişe zarar verecek faaliyetlerde bulunulması, SWOQY’nin önceden yazılı iznini alınmaksızın Platform’un üzerinde otomatik program, robot, web crawler, örümcek, veri madenciliği (data mining) ve veri taraması (data crawling) gibi "screen scraping" yazılımları veya sistemleri kullanılması ve bu şekilde Platform’da yer alan herhangi bir içeriğin tamamının veya bir kısmının izinsiz kopyalanarak, yayınlanması veya kullanılması.
    </Text>
                    <Text>
                        6.5. SWOQY yer sağlayıcı olarak, Platform üzerindeki hukuka aykırı hiçbir içerik, ürün, yorum, hizmet ve mesajdan ötürü sorumlu değildir SWOQY’nin sorumluluğu; kendisine hukuka aykırı bir içerik bildirildiği takdirde, ilgili içeriği yayından kaldırmakla sınırlıdır.
        </Text>
                    <Text>
                        6.6. Kullanıcı, hiçbir gerekçe altında, herhangi bir yöntem kullanarak, diğer Kullanıcı profillerini ve diğer Kullanıcı’ların Platform üzerindeki faaliyetleri hakkındaki yorumları manipüle edecek davranışlarda bulunamaz; bulunduğu takdirde, SWOQY’nin konuyla ilgili olarak uğradığı tüm zararını tazmin edeceğini ve SWOQY’nin Kullanıcı'nın üyeliğine geçici veya kalıcı olarak son verme hakkı bulunduğunu kabul, beyan ve taahhüt ederler.
        </Text>
                    <Text>
                        6.8. SWOQY, marka ve fikri hakkı dahil fakat bunlarla sınırlı olmaksızın her türlü fikri ve sınai mülkiyet haklarının ihlal edildiği iddiasında olan kişilerin yapacağı başvuruları inceleyecektir. SWOQY'ye yapılan başvurular sonucunda Kullanıcı’nın üyeliğini askıya alma ve iptal etme hakkını saklı tutar.
        </Text>
                    <Text>
                        6.12. İşbu Sözleşme, Kullanıcı Platform'a üye olduğu sürece yürürlükte kalacak ve hüküm ve sonuçlarını doğurmaya devam edecek; Kullanıcı'nın üyeliğinin geçici veya kalıcı olarak durdurulması veya kendi isteğiyle kapatılması hallerinde sona ermiş sayılacaktır. SWOQY, Kullanıcı'nın işbu Kullanıcı Sözleşmesi'ni ve/veya Platform içinde yer alan kullanıma, üyeliğe ve Hizmet'e ilişkin benzeri kuralları ihlal etmesi durumunda Kullanıcı Sözleşmesi'ni tek taraflı olarak feshedebilecek ve Kullanıcı fesih sebebiyle SWOQY’nin uğradığı tüm zararları tazmin etmekle yükümlü olacaktır.
        </Text>
                    <Text style={{ marginTop: 10 }}>
                        7. FİKRİ MÜLKİYET HAKLARI
        </Text>
                    <Text>
                        “SWOQY” markası ve logosu, “SWOQY” mobil uygulamasının ve Platform’un tasarımı, yazılımı, alan adı ve bunlara ilişkin olarak SWOQY tarafından oluşturulan her türlü marka, tasarım, logo, ticari takdim şekli, slogan ve diğer tüm içeriğin her türlü fikri mülkiyet hakkı ile kendi mülkiyetindedir. Kullanıcı, SWOQY’nin veya bağlı şirketlerinin mülkiyetine tabi fikri mülkiyet haklarını yazılı izni olmaksızın kullanamaz, paylaşamaz, dağıtamaz, sergileyemez, çoğaltamaz ve bunlardan türemiş çalışmalar yapamaz. Kullanıcı, mobil uygulamasının veya Platform’un bütünü ya da bir kısmını başka bir ortamda SWOQY’nin yazılı izni olmaksızın kullanamaz. Kullanıcı‘nın, üçüncü kişilerin veya SWOQY’nin fikri mülkiyet haklarını ihlal edecek şekilde davranması halinde, Kullanıcı, SWOQY’nin ve/veya söz konusu üçüncü kişinin tüm doğrudan ve dolaylı zararları ile masraflarını tazmin etmekle yükümlüdür.
        </Text>
                    <Text style={{ marginTop: 10 }}>
                        8. SÖZLEŞME DEĞİŞİKLİKLER
        </Text>
                    <Text>
                        SWOQY, tamamen kendi takdirine bağlı olmak üzere, işbu Sözleşme‘yi ve Platform’da yer alan KİŞİSEL VERİLERİN KORUNMASI HAKKINDA AÇIKLAMA VE GİZLİLİK POLİTİKASI’nda dahil her türlü politikayı, hüküm ve şartı uygun göreceği herhangi bir zamanda, yürürlükteki mevzuat hükümlerine aykırı olmamak kaydıyla Platform’da ilan ederek tek taraflı olarak değiştirebilir. İşbu Sözleşme’nin değişen hükümleri, Platform‘da ilan edildikleri tarihte geçerlilik kazanacak, geri kalan hükümler aynen yürürlükte kalarak hüküm ve sonuçlarını doğurmaya devam edecektir.
    </Text>
                    <Text style={{ marginTop: 10 }}>
                        9. MÜCBİR SEBER
    </Text>
                    <Text>
                        Ayaklanma, ambargo, devlet müdahalesi, isyan, işgal, savaş, seferberlik, grev, lokavt, iş eylemleri veya boykotlar dahil olmak üzere işçi-işveren anlaşmazlıkları, siber saldırı, iletişim sorunları, altyapı ve internet arızaları, sisteme ilişkin iyileştirme veya yenileştirme çalışmaları ve bu sebeple meydana gelebilecek arızalar, elektrik kesintisi, yangın, patlama, fırtına, sel, deprem, göç, salgın veya diğer bir doğal felaket veya SWOQY’nin kontrolü dışında gerçekleşen, kusurundan kaynaklanmayan ve makul olarak öngörülemeyecek diğer olaylar ("Mücbir Sebep") SWOQY’nın işbu Sözleşme‘den doğan yükümlülüklerini ifa etmesini engeller veya geciktirirse, SWOQY ifası Mücbir Sebep sonucunda engellenen veya geciken yükümlülüklerinden dolayı sorumlu tutulamaz ve bu durum işbu Sözleşme’nin bir ihlali olarak kabul edilemez.
        </Text>
                    <Text style={{ marginTop: 10 }}>
                        10. MUHTELİF HÜKÜMLER
        </Text>
                    <Text>
                        10.1. Delil sözleşmesi; Kullanıcı, işbu Sözleşme’den doğabilecek ihtilaflarda SWOQY‘nin resmi defter ve ticari kayıtları ile SWOQY’nin veri tabanında, sunucularında tutulan e-arşiv kayıtlarının, elektronik bilgilerin ve bilgisayar kayıtlarının, bağlayıcı, kesin ve münhasır delil teşkil edeceğini ve bu maddenin 6100 sayılı Hukuk Muhakemeleri Kanunu’nun 193. maddesi anlamında delil sözleşmesi niteliğinde olduğunu kabul eder.
        </Text>
                    <Text>
                        10.2. Uygulanacak Hukuk ve Uyuşmazlıkların Çözümü; İşbu Sözleşme münhasıran Türkiye Cumhuriyeti kanunlarına tabi olacaktır. İşbu Sözleşme’den kaynaklanan veya işbu Sözleşme ile bağlantılı olan her türlü ihtilaf, İstanbul Tüketici Hakem Heyetleri ve İstanbul (Çağlayan) Mahkemeleri ve İcra Müdürlükleri’nün münhasır yargı yetkisinde olacaktır.
        </Text>
                    <Text>
                        10.3. Bildirim; SWOQY, Kullanıcı ile Kullanıcı’nın kayıt olurken bildirmiş olduğu elektronik posta adresi vasıtasıyla veya telefon numarasına arama yapmak ve SMS göndermek suretiyle iletişim kuracaktır. Kullanıcı, elektronik posta adresini ve telefon numarasını güncel tutmakla yükümlüdür.
    </Text>
                    <Text>
                        10.4. Sözleşme’nin Bütünlüğü ve Bölünebilirliği; İşbu Sözleşme, konuya ilişkin olarak Taraflar arasındaki anlaşmanın tamamını oluşturmaktadır. İşbu Sözleşme’nin herhangi bir hükmünün yetkili herhangi bir mahkeme, tahkim heyeti veya idari makam tarafından tümüyle veya kısmen geçersiz veya uygulanamaz olduğu veya makul olmadığına karar verilmesi halinde, söz konusu geçersizlik, uygulanamamazlık veya makul olmama ölçüsünde işbu Sözleşme bölünebilir olarak kabul edilecek ve diğer hükümler tümüyle yürürlükte kalmaya devam edecektir.
    </Text>
                    <Text>
                        10.5. Sözleşme’nin Devri; Kullanıcı, SWOQY’nın önceden yazılı onayını almaksızın işbu Sözleşme’deki haklarını veya yükümlülüklerini tümüyle veya kısmen temlik edemeyecektir.
        </Text>
                    <Text>
                        10.6. Tadil ve Feragat; Taraflar’dan birinin Sözleşme’de kendisine verilen herhangi bir hakkı kullanmaması ya da icra etmemesi, söz konusu haktan feragat ettiği anlamına gelmeyecek veya söz konusu hakkın daha sonra kullanılmasını ya da icra edilmesini engellemeyecektir.
        </Text>
                    <Text>
                        10 (on) maddeden ibaret işbu Sözleşme, Kullanıcı tarafından her bir hükmü okunarak ve bütünüyle anlaşılarak elektronik ortamda onaylanmak suretiyle, onaylandığı an itibariyle yürürlüğe girmiştir.
     </Text>

                </ScrollView>
            </View>
        )
    }

    //#endregion
}


export default EULAScreen;
