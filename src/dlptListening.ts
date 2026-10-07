import type { CourseLevel } from './learnCourse'
import type { Resource } from './resourceCatalog'

export const dlptListeningTopics = ['Politics', 'Culture', 'Sports', 'Economy', 'Society', 'Science & technology'] as const
type Topic = typeof dlptListeningTopics[number]
type Language = 'Spanish' | 'Italian' | 'Mandarin Chinese' | 'Modern Standard Arabic' | 'Russian'
type Story = { title: string; passage: string }

const stories: Record<Language, Record<Topic, [Story, Story, Story]>> = {
  Spanish: {
    Politics: [
      { title: 'A city budget meeting', passage: 'El ayuntamiento debatió cómo repartir el nuevo presupuesto. Unos vecinos pidieron mejorar los autobuses; otros prefirieron reparar las escuelas. La comisión publicará los costos antes de votar.' },
      { title: 'Candidates discuss housing', passage: 'En el debate municipal, dos candidatos presentaron propuestas para ampliar las viviendas asequibles. Ambos hablaron de terrenos públicos, pero discreparon sobre quién debía financiar las obras. El electorado decidirá el domingo.' },
      { title: 'A public consultation', passage: 'El gobierno local abrió una consulta sobre el uso de una plaza. Comerciantes, residentes y asociaciones enviaron observaciones antes de la audiencia. El informe final comparará las opiniones con los datos de circulación.' },
    ],
    Culture: [
      { title: 'A neighborhood festival', passage: 'El barrio celebró su festival anual con música, comida y bailes tradicionales. Este año, jóvenes artistas también subieron al escenario. Los organizadores esperan que el encuentro acerque a distintas generaciones.' },
      { title: 'A museum restores its archive', passage: 'Un museo municipal digitalizó fotografías y cartas donadas por familias de la zona. El equipo pidió permiso para publicar los materiales y añadió historias orales para explicar su contexto. La colección ya puede consultarse en la biblioteca.' },
      { title: 'Classes keep a language alive', passage: 'Una asociación ofrece clases gratuitas para que los niños aprendan la lengua de sus abuelos. Las lecciones combinan cuentos, canciones y conversaciones cotidianas. Los participantes prepararán una presentación para la feria cultural.' },
    ],
    Sports: [
      { title: 'A youth football final', passage: 'El equipo juvenil cambió su estrategia después de revisar el primer tiempo. Sus jugadores pasaron más el balón y aprovecharon los espacios. El partido terminó empatado, pero el entrenador destacó el trabajo colectivo.' },
      { title: 'A city makes room for runners', passage: 'La carrera anual atrajo a corredores de varios barrios. Para facilitar la participación, la ciudad añadió una ruta corta y puntos de agua. Los organizadores evaluarán el recorrido con los participantes antes del próximo año.' },
      { title: 'Women athletes seek equal access', passage: 'Varias deportistas solicitaron más horas de entrenamiento en el polideportivo. La dirección revisará el calendario y comparará la demanda de cada equipo. Ambas partes acordaron reunirse de nuevo el mes próximo.' },
    ],
    Economy: [
      { title: 'Market prices rise', passage: 'Los vendedores del mercado dicen que el costo del transporte ha encarecido algunas frutas. Para mantener clientes, varias tiendas ofrecen productos de temporada. Una asociación local publicará una comparación de precios cada semana.' },
      { title: 'A small business changes its hours', passage: 'Una panadería amplió su horario para atender a quienes salen tarde del trabajo. La propietaria comparará las ventas y los gastos durante tres meses antes de decidir si mantiene el cambio. También pidió comentarios a sus clientes.' },
      { title: 'A port prepares for new trade', passage: 'El puerto espera recibir más carga después de renovar una terminal. La inversión podría crear empleo, aunque las empresas deberán coordinar horarios y reducir las demoras. Un comité revisará los resultados al final del año.' },
    ],
    Society: [
      { title: 'A library extends its hours', passage: 'La biblioteca del distrito abrirá más tarde dos noches por semana. La decisión responde a una encuesta en la que estudiantes y trabajadores pidieron horarios flexibles. El personal medirá la asistencia durante el periodo de prueba.' },
      { title: 'A clinic brings care closer', passage: 'Una clínica móvil visitará pueblos alejados una vez por semana. El servicio ofrecerá consultas básicas y orientación para obtener citas especializadas. El municipio revisará cuántas personas utilizan el programa.' },
      { title: 'Residents redesign a public square', passage: 'Los residentes propusieron más sombra, bancos y espacio seguro para cruzar la plaza. El municipio probará un diseño temporal antes de iniciar obras permanentes. La evaluación incluirá las opiniones de comerciantes y peatones.' },
    ],
    'Science & technology': [
      { title: 'Researchers monitor river water', passage: 'Un equipo universitario instaló sensores para medir la calidad del agua del río. Los datos se compararán con muestras tomadas por vecinos. Si las mediciones coinciden, la ciudad publicará alertas más rápidas.' },
      { title: 'A school tests digital lessons', passage: 'Tres escuelas probarán una plataforma digital durante un semestre. El estudio comparará la participación y los resultados con los de las clases habituales. Los docentes también informarán sobre los problemas de acceso a internet.' },
      { title: 'Forecasts help prepare for heat', passage: 'Un centro de investigación combina pronósticos meteorológicos con datos de salud pública. El objetivo es avisar con tiempo a los barrios más expuestos al calor. Los especialistas advierten que las estimaciones deben revisarse cuando cambian las condiciones.' },
    ],
  },
  Italian: {
    Politics: [
      { title: 'A city budget meeting', passage: 'Il consiglio comunale ha discusso come distribuire il nuovo bilancio. Alcuni residenti hanno chiesto autobus migliori; altri preferiscono riparare le scuole. La commissione pubblicherà i costi prima del voto.' },
      { title: 'Candidates discuss housing', passage: 'Nel dibattito locale, due candidati hanno presentato piani per aumentare gli alloggi accessibili. Entrambi hanno parlato di terreni pubblici, ma non sono d’accordo su chi debba finanziare i lavori. Gli elettori decideranno domenica.' },
      { title: 'A public consultation', passage: 'Il comune ha avviato una consultazione sull’uso della piazza. Negozianti, residenti e associazioni hanno inviato osservazioni prima dell’udienza. Il rapporto finale confronterà le opinioni con i dati sul traffico.' },
    ],
    Culture: [
      { title: 'A neighborhood festival', passage: 'Il quartiere ha festeggiato la ricorrenza annuale con musica, cibo e danze tradizionali. Quest’anno si sono esibiti anche giovani artisti. Gli organizzatori sperano che l’incontro avvicini generazioni diverse.' },
      { title: 'A museum restores its archive', passage: 'Un museo civico ha digitalizzato fotografie e lettere donate dalle famiglie della zona. Il gruppo ha chiesto il permesso di pubblicarle e ha aggiunto testimonianze per spiegarne il contesto. La raccolta è consultabile in biblioteca.' },
      { title: 'Classes keep a language alive', passage: 'Un’associazione offre lezioni gratuite affinché i bambini imparino la lingua dei nonni. Le attività uniscono racconti, canzoni e conversazioni quotidiane. I partecipanti prepareranno una presentazione per la festa culturale.' },
    ],
    Sports: [
      { title: 'A youth football final', passage: 'La squadra giovanile ha cambiato strategia dopo aver rivisto il primo tempo. I giocatori hanno passato di più la palla e sfruttato gli spazi. La partita è finita in parità, ma l’allenatore ha elogiato il gioco di squadra.' },
      { title: 'A city makes room for runners', passage: 'La corsa annuale ha attirato partecipanti da diversi quartieri. Per facilitare la partecipazione, la città ha aggiunto un percorso breve e punti d’acqua. Gli organizzatori valuteranno il tracciato con i corridori.' },
      { title: 'Women athletes seek equal access', passage: 'Alcune atlete hanno chiesto più ore di allenamento nel centro sportivo. La direzione esaminerà il calendario e confronterà le richieste delle squadre. Le parti si incontreranno di nuovo il mese prossimo.' },
    ],
    Economy: [
      { title: 'Market prices rise', passage: 'I venditori del mercato dicono che il costo del trasporto ha fatto aumentare il prezzo di alcuni frutti. Per mantenere i clienti, diversi negozi offrono prodotti di stagione. Un’associazione pubblicherà un confronto settimanale.' },
      { title: 'A small business changes its hours', passage: 'Una panetteria ha prolungato l’orario per servire chi finisce tardi di lavorare. La proprietaria confronterà vendite e spese per tre mesi prima di decidere se mantenere la modifica. Ha chiesto anche il parere dei clienti.' },
      { title: 'A port prepares for new trade', passage: 'Il porto prevede più merci dopo il rinnovo di un terminal. L’investimento potrebbe creare posti di lavoro, ma le aziende dovranno coordinare gli orari e ridurre i ritardi. Un comitato valuterà i risultati a fine anno.' },
    ],
    Society: [
      { title: 'A library extends its hours', passage: 'La biblioteca del quartiere resterà aperta più a lungo due sere alla settimana. La decisione risponde a un sondaggio in cui studenti e lavoratori hanno chiesto orari flessibili. Il personale misurerà le presenze durante la prova.' },
      { title: 'A clinic brings care closer', passage: 'Un ambulatorio mobile visiterà i paesi lontani una volta alla settimana. Il servizio offrirà visite di base e aiuto per prenotare consulti specialistici. Il comune controllerà quante persone usano il programma.' },
      { title: 'Residents redesign a public square', passage: 'I residenti hanno proposto più ombra, panchine e attraversamenti sicuri nella piazza. Il comune proverà un progetto temporaneo prima dei lavori permanenti. La valutazione includerà i pareri di negozianti e pedoni.' },
    ],
    'Science & technology': [
      { title: 'Researchers monitor river water', passage: 'Un gruppo universitario ha installato sensori per misurare la qualità dell’acqua del fiume. I dati saranno confrontati con campioni raccolti dagli abitanti. Se le misure coincidono, la città potrà pubblicare avvisi più rapidamente.' },
      { title: 'A school tests digital lessons', passage: 'Tre scuole proveranno una piattaforma digitale per un semestre. Lo studio confronterà la partecipazione e i risultati con quelli delle lezioni abituali. Gli insegnanti segnaleranno anche i problemi di accesso a internet.' },
      { title: 'Forecasts help prepare for heat', passage: 'Un centro di ricerca combina previsioni meteorologiche e dati sanitari. L’obiettivo è avvisare in tempo i quartieri più esposti al caldo. Gli esperti ricordano che le stime vanno aggiornate quando cambiano le condizioni.' },
    ],
  },
  'Mandarin Chinese': {
    Politics: [
      { title: 'A city budget meeting', passage: '市议会讨论了怎样分配新的预算。一些居民希望改善公交车，另一些居民认为应该先修理学校。委员会会在投票前公布费用。' },
      { title: 'Candidates discuss housing', passage: '在地方辩论会上，两位候选人提出了增加平价住房的计划。他们都谈到公共土地，但对工程资金由谁承担意见不同。选民将在星期日作出决定。' },
      { title: 'A public consultation', passage: '市政府开始征求居民对广场用途的意见。商店、居民和协会在听证会前提交了建议。最后的报告将把这些意见与交通数据进行比较。' },
    ],
    Culture: [
      { title: 'A neighborhood festival', passage: '社区举办了一年一度的节日，有音乐、美食和传统舞蹈。今年，年轻的艺术家也参加了演出。组织者希望这个活动能让不同年龄的人彼此了解。' },
      { title: 'A museum restores its archive', passage: '市立博物馆把当地家庭捐赠的照片和信件数字化。工作人员征求了公开这些材料的许可，也加入口述历史来说明背景。现在，公众可以在图书馆查阅这批资料。' },
      { title: 'Classes keep a language alive', passage: '一个协会免费开课，让孩子学习祖父母使用的语言。课程包括故事、歌曲和日常对话。学生们将为文化节准备一场演出。' },
    ],
    Sports: [
      { title: 'A youth football final', passage: '青年队看完上半场后改变了战术。队员增加了传球，也更注意利用空位。比赛最后打成平局，不过教练肯定了大家的合作。' },
      { title: 'A city makes room for runners', passage: '一年一度的长跑吸引了几个社区的参加者。为了方便更多人，市里增加了短路线和饮水点。组织者会和跑步者一起评估路线。' },
      { title: 'Women athletes seek equal access', passage: '几位女运动员要求增加体育馆的训练时间。管理人员将重新检查日程，并比较各队的需求。双方同意下个月再次讨论。' },
    ],
    Economy: [
      { title: 'Market prices rise', passage: '市场摊主说，运输费用上涨使一些水果变贵。为了留住顾客，几家商店开始销售当季产品。当地协会每周都会公布价格比较。' },
      { title: 'A small business changes its hours', passage: '一家面包店延长了营业时间，方便下班较晚的顾客。店主会用三个月比较收入和支出，再决定是否保留新时间。她也询问了顾客的意见。' },
      { title: 'A port prepares for new trade', passage: '港口翻新一个货运站后，预计会接收更多货物。这项投资可能带来工作机会，但公司需要协调时间并减少延误。委员会会在年底评估结果。' },
    ],
    Society: [
      { title: 'A library extends its hours', passage: '区图书馆每周有两个晚上延长开放时间。这个决定来自一项调查，学生和上班族都希望时间更灵活。工作人员会在试行期间记录到馆人数。' },
      { title: 'A clinic brings care closer', passage: '流动诊所每周去一次偏远乡镇，提供基本检查，并帮助居民预约专科医生。市政府将统计有多少人使用这项服务。' },
      { title: 'Residents redesign a public square', passage: '居民建议在广场增加树荫、长椅和安全的人行道。市政府会先试行临时设计，再决定是否进行永久施工。评估也会听取商家和行人的意见。' },
    ],
    'Science & technology': [
      { title: 'Researchers monitor river water', passage: '大学研究人员安装了传感器，测量河水的质量。他们会把数据与居民采集的水样进行比较。如果结果一致，市政府就能更快发布提醒。' },
      { title: 'A school tests digital lessons', passage: '三所学校将在一个学期内试用数字学习平台。研究人员会比较学生的参与情况和学习结果，也会记录教师发现的网络接入问题。' },
      { title: 'Forecasts help prepare for heat', passage: '研究中心把天气预报与公共卫生数据结合起来，希望及时提醒容易受高温影响的社区。专家指出，天气变化时，预测也需要更新。' },
    ],
  },
  'Modern Standard Arabic': {
    Politics: [
      { title: 'A city budget meeting', passage: 'نَاقَشَ الْمَجْلِسُ كَيْفِيَّةَ تَوْزِيعِ الْمِيزَانِيَّةِ الْجَدِيدَةِ. طَلَبَ بَعْضُ السُّكَّانِ تَحْسِينَ الْحَافِلَاتِ، وَفَضَّلَ آخَرُونَ إِصْلَاحَ الْمَدَارِسِ. سَتَنْشُرُ اللَّجْنَةُ التَّكَالِيفَ قَبْلَ التَّصْوِيتِ.' },
      { title: 'Candidates discuss housing', passage: 'قَدَّمَ مُرَشَّحَانِ خِطَّتَيْنِ لِزِيَادَةِ الْمَسَاكِنِ الْمَيْسُورَةِ فِي مُنَاظَرَةٍ مَحَلِّيَّةٍ. اتَّفَقَا عَلَى أَهَمِّيَّةِ الأَرَاضِي الْعَامَّةِ، وَاخْتَلَفَا حَوْلَ مَصْدَرِ التَّمْوِيلِ. سَيَخْتَارُ النَّاخِبُونَ يَوْمَ الأَحَدِ.' },
      { title: 'A public consultation', passage: 'بَدَأَتِ الْبَلَدِيَّةُ مُشَاوَرَةً حَوْلَ اسْتِخْدَامِ السَّاحَةِ. أَرْسَلَ التُّجَّارُ وَالسُّكَّانُ وَالْجَمْعِيَّاتُ مُقْتَرَحَاتِهِمْ قَبْلَ جَلْسَةِ الاسْتِمَاعِ. سَتُقَارِنُ التَّقْرِيرَاتُ النِّهَائِيَّةُ الآرَاءَ بِبَيَانَاتِ حَرَكَةِ الْمُرُورِ.' },
    ],
    Culture: [
      { title: 'A neighborhood festival', passage: 'احْتَفَلَ الْحَيُّ بِمِهْرَجَانِهِ السَّنَوِيِّ بِالْمُوسِيقَى وَالطَّعَامِ وَالرَّقْصَاتِ التَّقْلِيدِيَّةِ. وَشَارَكَ فَنَّانُونَ شَبَابٌ فِي عُرُوضِ هَذَا الْعَامِ. يَأْمَلُ الْمُنَظِّمُونَ أَنْ يَجْمَعَ اللِّقَاءُ أَجْيَالًا مُخْتَلِفَةً.' },
      { title: 'A museum restores its archive', passage: 'حَوَّلَ مُتْحَفٌ مَحَلِّيٌّ صُوَرًا وَرَسَائِلَ تَبَرَّعَتْ بِهَا أُسَرٌ إِلَى مَوَادَّ رَقْمِيَّةٍ. طَلَبَ الْفَرِيقُ الإِذْنَ لِنَشْرِهَا وَأَضَافَ شَهَادَاتٍ شَفَهِيَّةً لِتَوْضِيحِ سِيَاقِهَا. وَأَصْبَحَتِ الْمَجْمُوعَةُ مُتَاحَةً فِي الْمَكْتَبَةِ.' },
      { title: 'Classes keep a language alive', passage: 'تُنَظِّمُ جَمْعِيَّةٌ دُرُوسًا مَجَّانِيَّةً لِيَتَعَلَّمَ الأَطْفَالُ لُغَةَ أَجْدَادِهِمْ. تَجْمَعُ الدُّرُوسُ بَيْنَ الْقِصَصِ وَالأَغَانِي وَالْمُحَادَثَاتِ الْيَوْمِيَّةِ. وَسَيُعِدُّ الْمُشَارِكُونَ عَرْضًا لِلْمِهْرَجَانِ الثَّقَافِيِّ.' },
    ],
    Sports: [
      { title: 'A youth football final', passage: 'غَيَّرَ فَرِيقُ الشَّبَابِ خُطَّتَهُ بَعْدَ مُرَاجَعَةِ الشَّوْطِ الأَوَّلِ. وَمَرَّرَ اللَّاعِبُونَ الْكُرَةَ أَكْثَرَ وَاسْتَفَادُوا مِنَ الْمَسَاحَاتِ. انْتَهَتِ الْمُبَارَاةُ بِالتَّعَادُلِ، وَأَشَادَ الْمُدَرِّبُ بِعَمَلِ الْفَرِيقِ.' },
      { title: 'A city makes room for runners', passage: 'اجْتَذَبَ السِّبَاقُ السَّنَوِيُّ عَدَّائِينَ مِنْ أَحْيَاءَ مُخْتَلِفَةٍ. وَأَضَافَتِ الْمَدِينَةُ مَسَارًا قَصِيرًا وَنِقَاطًا لِلْمِيَاهِ لِتَسْهِيلِ الْمُشَارَكَةِ. وَسَيُقَيِّمُ الْمُنَظِّمُونَ الْمَسَارَ مَعَ الْمُشَارِكِينَ.' },
      { title: 'Women athletes seek equal access', passage: 'طَلَبَتْ رِيَاضِيَّاتٌ سَاعَاتٍ إِضَافِيَّةً لِلتَّدْرِيبِ فِي الْمَرْكَزِ الرِّيَاضِيِّ. وَسَتُرَاجِعُ الإِدَارَةُ الْجَدْوَلَ وَاحْتِيَاجَاتِ الْفِرَقِ. وَاتَّفَقَ الطَّرَفَانِ عَلَى الاجْتِمَاعِ مُجَدَّدًا الشَّهْرَ الْمُقْبِلَ.' },
    ],
    Economy: [
      { title: 'Market prices rise', passage: 'قَالَ بَاعَةُ السُّوقِ إِنَّ تَكَالِيفَ النَّقْلِ رَفَعَتْ أَسْعَارَ بَعْضِ الْفَوَاكِهِ. وَعَرَضَتْ مَتَاجِرُ عِدَّةٌ مُنْتَجَاتِ الْمَوْسِمِ لِلْمُحَافَظَةِ عَلَى الزَّبَائِنِ. وَسَتَنْشُرُ جَمْعِيَّةٌ مَحَلِّيَّةٌ مُقَارَنَةً لِلأَسْعَارِ أُسْبُوعِيًّا.' },
      { title: 'A small business changes its hours', passage: 'مَدَّدَ مَخْبَزٌ سَاعَاتِ عَمَلِهِ لِخِدْمَةِ الْعَامِلِينَ الَّذِينَ يَنْتَهِي عَمَلُهُمْ مُتَأَخِّرًا. وَسَتُقَارِنُ صَاحِبَةُ الْمَخْبَزِ الْمَبِيعَاتِ وَالنَّفَقَاتِ لِمُدَّةِ ثَلَاثَةِ أَشْهُرٍ. كَمَا طَلَبَتْ رَأْيَ الزَّبَائِنِ.' },
      { title: 'A port prepares for new trade', passage: 'يَتَوَقَّعُ الْمِينَاءُ شَحْنَاتٍ أَكْثَرَ بَعْدَ تَجْدِيدِ أَحَدِ الْمَرَافِقِ. وَقَدْ يُوَفِّرُ الاسْتِثْمَارُ فُرَصَ عَمَلٍ، لَكِنَّ الشَّرِكَاتِ تَحْتَاجُ إِلَى تَنْسِيقِ الْمَوَاعِيدِ وَتَقْلِيلِ التَّأْخِيرِ. وَسَتُقَيِّمُ لَجْنَةٌ النَّتَائِجَ فِي نِهَايَةِ الْعَامِ.' },
    ],
    Society: [
      { title: 'A library extends its hours', passage: 'سَتَفْتَحُ مَكْتَبَةُ الْحَيِّ أَبْوَابَهَا مُتَأَخِّرًا لَيْلَتَيْنِ كُلَّ أُسْبُوعٍ. وَجَاءَ الْقَرَارُ بَعْدَ اسْتِطْلَاعٍ طَلَبَ فِيهِ الطُّلَّابُ وَالْعَامِلُونَ مَوَاعِيدَ أَكْثَرَ مُرُونَةً. وَسَيَقِيسُ الْمُوَظَّفُونَ عَدَدَ الزُّوَّارِ خِلَالَ التَّجْرِبَةِ.' },
      { title: 'A clinic brings care closer', passage: 'سَتَزُورُ عِيَادَةٌ مُتَنَقِّلَةٌ الْقُرَى الْبَعِيدَةَ مَرَّةً كُلَّ أُسْبُوعٍ. وَسَتُقَدِّمُ فُحُوصًا أَسَاسِيَّةً وَمُسَاعَدَةً لِحَجْزِ مَوَاعِيدَ مُتَخَصِّصَةٍ. وَسَتُرَاجِعُ الْبَلَدِيَّةُ عَدَدَ الْمُسْتَفِيدِينَ مِنَ الْخِدْمَةِ.' },
      { title: 'Residents redesign a public square', passage: 'اقْتَرَحَ السُّكَّانُ زِيَادَةَ الظِّلِّ وَالْمَقَاعِدِ وَمَمَرَّاتِ الْعُبُورِ الآمِنَةِ فِي السَّاحَةِ. وَسَتُجَرِّبُ الْبَلَدِيَّةُ تَصْمِيمًا مُؤَقَّتًا قَبْلَ بَدْءِ الأَعْمَالِ الدَّائِمَةِ. وَسَيَشْمَلُ التَّقْيِيمُ آراءَ التُّجَّارِ وَالْمَارَّةِ.' },
    ],
    'Science & technology': [
      { title: 'Researchers monitor river water', passage: 'رَكَّبَ فَرِيقٌ جَامِعِيٌّ أَجْهِزَةَ اسْتِشْعَارٍ لِقِيَاسِ جَوْدَةِ مِيَاهِ النَّهْرِ. وَسَيُقَارِنُ الْبَاحِثُونَ الْبَيَانَاتِ بِعَيِّنَاتٍ جَمَعَهَا السُّكَّانُ. وَإِذَا تَوَافَقَتِ النَّتَائِجُ، فَسَتَنْشُرُ الْمَدِينَةُ تَحْذِيرَاتٍ أَسْرَعَ.' },
      { title: 'A school tests digital lessons', passage: 'سَتُجَرِّبُ ثَلَاثُ مَدَارِسَ مِنَصَّةً رَقْمِيَّةً لِفَصْلٍ دِرَاسِيٍّ. وَسَتُقَارِنُ الدِّرَاسَةُ مُشَارَكَةَ الطُّلَّابِ وَنَتَائِجَهُمْ بِالدُّرُوسِ الْمُعْتَادَةِ. كَمَا سَيُسَجِّلُ الْمُعَلِّمُونَ مُشْكِلَاتِ الاتِّصَالِ بِالإِنْتَرْنِتِ.' },
      { title: 'Forecasts help prepare for heat', passage: 'يَجْمَعُ مَرْكَزُ بَحْثٍ تَوَقُّعَاتِ الطَّقْسِ وَبَيَانَاتِ الصِّحَّةِ الْعَامَّةِ. وَيَهْدِفُ إِلَى تَحْذِيرِ الأَحْيَاءِ الأَكْثَرِ تَعَرُّضًا لِلْحَرِّ مُبَكِّرًا. وَيُؤَكِّدُ الْخُبَرَاءُ ضَرُورَةَ تَحْدِيثِ التَّوَقُّعَاتِ عِنْدَ تَغَيُّرِ الظُّرُوفِ.' },
    ],
  },
  Russian: {
    Politics: [
      { title: 'A city budget meeting', passage: 'Городской совет обсуждал, как распределить новый бюджет. Одни жители просили улучшить автобусное сообщение, другие предлагали сначала отремонтировать школы. Комиссия опубликует расходы до голосования.' },
      { title: 'Candidates discuss housing', passage: 'На местных дебатах два кандидата представили планы по строительству доступного жилья. Оба говорили о городской земле, но разошлись во мнении о том, кто должен оплачивать работы. Избиратели примут решение в воскресенье.' },
      { title: 'A public consultation', passage: 'Город начал обсуждение будущего площади. Владельцы магазинов, жители и общественные группы прислали предложения до слушаний. В итоговом отчёте мнения сравнят с данными о движении транспорта.' },
    ],
    Culture: [
      { title: 'A neighborhood festival', passage: 'В районе прошёл ежегодный праздник с музыкой, едой и традиционными танцами. В этом году на сцене выступили и молодые артисты. Организаторы надеются, что встреча объединит разные поколения.' },
      { title: 'A museum restores its archive', passage: 'Городской музей оцифровал фотографии и письма, переданные местными семьями. Сотрудники получили разрешение на публикацию и добавили устные рассказы, чтобы объяснить контекст. Теперь коллекцию можно изучить в библиотеке.' },
      { title: 'Classes keep a language alive', passage: 'Общество проводит бесплатные занятия, чтобы дети изучали язык своих бабушек и дедушек. На уроках используют рассказы, песни и повседневные разговоры. Участники подготовят выступление для культурного праздника.' },
    ],
    Sports: [
      { title: 'A youth football final', passage: 'Молодёжная команда изменила тактику после просмотра первого тайма. Игроки стали чаще отдавать передачи и использовать свободное пространство. Матч закончился вничью, но тренер отметил командную работу.' },
      { title: 'A city makes room for runners', passage: 'Ежегодный забег привлёк участников из разных районов. Чтобы больше людей могли участвовать, город добавил короткий маршрут и пункты с водой. Организаторы обсудят трассу с бегунами.' },
      { title: 'Women athletes seek equal access', passage: 'Спортсменки попросили выделить больше времени для тренировок в спортивном центре. Руководство пересмотрит расписание и сравнит запросы команд. Стороны договорились снова встретиться в следующем месяце.' },
    ],
    Economy: [
      { title: 'Market prices rise', passage: 'Продавцы на рынке говорят, что перевозка сделала некоторые фрукты дороже. Чтобы сохранить покупателей, магазины предлагают сезонные продукты. Местное объединение будет каждую неделю публиковать сравнение цен.' },
      { title: 'A small business changes its hours', passage: 'Пекарня продлила часы работы для людей, которые поздно возвращаются с работы. Владелица сравнит доходы и расходы за три месяца, прежде чем решить, оставить ли новый график. Она также спросила мнение покупателей.' },
      { title: 'A port prepares for new trade', passage: 'После обновления терминала порт ожидает больше грузов. Инвестиции могут создать рабочие места, однако компаниям придётся согласовать расписание и сократить задержки. Комитет оценит результаты в конце года.' },
    ],
    Society: [
      { title: 'A library extends its hours', passage: 'Районная библиотека будет два вечера в неделю работать дольше. Решение приняли после опроса: студенты и работники просили более гибкий график. Во время испытательного периода сотрудники будут считать посетителей.' },
      { title: 'A clinic brings care closer', passage: 'Мобильная клиника будет раз в неделю приезжать в отдалённые посёлки. Там можно будет пройти простое обследование и получить помощь с записью к специалисту. Город проверит, сколько людей воспользовались услугой.' },
      { title: 'Residents redesign a public square', passage: 'Жители предложили добавить на площадь тень, скамейки и безопасные переходы. Город сначала проверит временный вариант, а затем решит, начинать ли постоянные работы. В оценке учтут мнение торговцев и пешеходов.' },
    ],
    'Science & technology': [
      { title: 'Researchers monitor river water', passage: 'Университетская группа установила датчики для проверки качества речной воды. Учёные сравнят показания с пробами, которые собрали жители. Если результаты совпадут, город сможет быстрее публиковать предупреждения.' },
      { title: 'A school tests digital lessons', passage: 'Три школы будут один семестр пользоваться цифровой учебной платформой. Исследование сравнит участие учеников и их результаты с обычными уроками. Учителя также сообщат о проблемах с доступом к интернету.' },
      { title: 'Forecasts help prepare for heat', passage: 'Исследовательский центр объединяет прогнозы погоды и данные общественного здравоохранения. Его цель — заранее предупредить районы, которые сильнее страдают от жары. Специалисты отмечают, что прогнозы нужно обновлять при изменении условий.' },
    ],
  },
}

const levels: CourseLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const levelContext: Record<Language, Record<CourseLevel, string>> = {
  Spanish: {
    'Pre-A1': '',
    A1: 'La comunidad espera noticias.',
    A2: 'Después de la primera etapa, los organizadores recogerán las opiniones de los participantes.',
    B1: 'Los primeros resultados se revisarán junto con los comentarios de las personas afectadas.',
    B2: 'La evaluación tendrá que distinguir los efectos inmediatos de los cambios que podrían aparecer más adelante.',
    C1: 'Aunque los datos iniciales parecen claros, las diferencias entre los grupos limitan una comparación directa.',
    C2: 'Por tanto, cualquier conclusión dependerá de cómo se definan los indicadores y de si se mantienen condiciones comparables.',
  },
  Italian: {
    'Pre-A1': '',
    A1: 'La comunità aspetta notizie.',
    A2: 'Dopo la prima fase, gli organizzatori raccoglieranno le opinioni dei partecipanti.',
    B1: 'I primi risultati saranno esaminati insieme ai commenti delle persone interessate.',
    B2: 'La valutazione dovrà distinguere gli effetti immediati dai cambiamenti che potrebbero emergere in seguito.',
    C1: 'Anche se i primi dati sembrano chiari, le differenze tra i gruppi limitano un confronto diretto.',
    C2: 'Di conseguenza, ogni conclusione dipenderà dalla definizione degli indicatori e dalla possibilità di mantenere condizioni comparabili.',
  },
  'Mandarin Chinese': {
    'Pre-A1': '',
    A1: '社区正在等待消息。',
    A2: '第一阶段结束后，组织者会收集参加者的意见。',
    B1: '工作人员会结合受影响者的意见，一起检查初步结果。',
    B2: '评估时需要区分眼前的影响和以后可能出现的变化。',
    C1: '虽然初步数据看起来很清楚，但不同群体之间的差异限制了直接比较。',
    C2: '因此，结论取决于指标的定义，也取决于能否在相同条件下继续收集资料。',
  },
  'Modern Standard Arabic': {
    'Pre-A1': '',
    A1: 'يَنْتَظِرُ الْمُجْتَمَعُ أَخْبَارًا.',
    A2: 'بَعْدَ الْمَرْحَلَةِ الأُولَى، سَيَجْمَعُ الْمُنَظِّمُونَ آراءَ الْمُشَارِكِينَ.',
    B1: 'سَتُرَاجَعُ النَّتَائِجُ الأُولَى مَعَ مُلَاحَظَاتِ الأَشْخَاصِ الْمَعْنِيِّينَ.',
    B2: 'يَجِبُ أَنْ يُمَيِّزَ التَّقْيِيمُ بَيْنَ الآثَارِ الْفَوْرِيَّةِ وَالتَّغَيُّرَاتِ الَّتِي قَدْ تَظْهَرُ لَاحِقًا.',
    C1: 'وَعَلَى الرَّغْمِ مِنْ وُضُوحِ الْبَيَانَاتِ الأَوَّلِيَّةِ، فَإِنَّ الاخْتِلَافَ بَيْنَ الْمَجْمُوعَاتِ يَحُدُّ مِنَ الْمُقَارَنَةِ الْمُبَاشِرَةِ.',
    C2: 'لِذَلِكَ يَعْتَمِدُ أَيُّ اسْتِنْتَاجٍ عَلَى تَعْرِيفِ الْمُؤَشِّرَاتِ وَإِمْكَانِيَّةِ الإِبْقَاءِ عَلَى ظُرُوفٍ قَابِلَةٍ لِلْمُقَارَنَةِ.',
  },
  Russian: {
    'Pre-A1': '',
    A1: 'Жители ждут новостей.',
    A2: 'После первого этапа организаторы соберут мнения участников.',
    B1: 'Первые результаты рассмотрят вместе с отзывами тех, кого коснулось это решение.',
    B2: 'При оценке придётся отличать немедленные последствия от изменений, которые могут проявиться позже.',
    C1: 'Хотя первые данные кажутся ясными, различия между группами мешают прямому сравнению.',
    C2: 'Поэтому любой вывод будет зависеть от выбора показателей и от того, удастся ли сохранить сопоставимые условия.',
  },
}

const questions: Record<Topic, Array<{ prompt: string; correct: string; distractors: [string, string, string] }>> = {
  Politics: [
    { prompt: 'What will the committee do before the vote?', correct: 'Publish the budget costs', distractors: ['Close the schools', 'Cancel the bus routes', 'Choose the election date'] },
    { prompt: 'When will voters make their decision?', correct: 'On Sunday', distractors: ['At the next council meeting', 'At the end of the year', 'After the construction work'] },
    { prompt: 'What will the final report compare?', correct: 'Public comments and traffic data', distractors: ['School grades and library hours', 'Ticket prices and team scores', 'Museum visits and water samples'] },
  ],
  Culture: [
    { prompt: 'Who performed at this year’s festival?', correct: 'Young artists', distractors: ['City council members', 'University researchers', 'Professional runners'] },
    { prompt: 'What did museum staff add to explain the archive?', correct: 'Oral histories', distractors: ['A sports schedule', 'A budget proposal', 'A weather forecast'] },
    { prompt: 'What are the children learning?', correct: 'Their grandparents’ language', distractors: ['How to repair the museum', 'How to run a race', 'How to use water sensors'] },
  ],
  Sports: [
    { prompt: 'What did the youth team do after reviewing the first half?', correct: 'Changed its strategy', distractors: ['Cancelled the match', 'Moved the game to a new city', 'Replaced the coach'] },
    { prompt: 'What did the city add to help more people join the race?', correct: 'A short route and water stops', distractors: ['A new museum and archive', 'A larger market and port', 'More school lessons'] },
    { prompt: 'What will the sports center review?', correct: 'The training schedule and team requests', distractors: ['The election results', 'The market prices', 'The river measurements'] },
  ],
  Economy: [
    { prompt: 'Why have some fruit prices increased?', correct: 'Transport costs have risen', distractors: ['The library is open later', 'The team changed its strategy', 'The museum digitized letters'] },
    { prompt: 'How long will the bakery compare sales and expenses?', correct: 'Three months', distractors: ['One week', 'One semester', 'One year'] },
    { prompt: 'What may the port investment create?', correct: 'Jobs', distractors: ['A cultural festival', 'A mobile clinic', 'A school platform'] },
  ],
  Society: [
    { prompt: 'Why did the library change its hours?', correct: 'Students and workers requested flexibility', distractors: ['The port expected more cargo', 'The team needed a new route', 'Researchers installed sensors'] },
    { prompt: 'How often will the mobile clinic visit remote communities?', correct: 'Once a week', distractors: ['Two evenings a week', 'Once a semester', 'At the end of the year'] },
    { prompt: 'What will the city try before permanent construction?', correct: 'A temporary square design', distractors: ['A new election', 'A longer race', 'A digital archive'] },
  ],
  'Science & technology': [
    { prompt: 'What will researchers compare with the sensor data?', correct: 'Water samples collected by residents', distractors: ['Library attendance', 'Market prices', 'Football scores'] },
    { prompt: 'What will the school study compare?', correct: 'Participation and learning results', distractors: ['Port costs and trade', 'Festival attendance and age', 'Clinic visits and bus routes'] },
    { prompt: 'What information does the research center combine?', correct: 'Weather forecasts and public health data', distractors: ['Election results and museum letters', 'Team schedules and market prices', 'Library hours and port cargo'] },
  ],
}

export function buildDlptListeningResources(language: Language): Resource[] {
  return levels.flatMap((level, levelIndex) =>
    dlptListeningTopics.flatMap((topic) =>
      stories[language][topic].map((story, storyIndex) => {
      const item = questions[topic][storyIndex]
        const order = (levelIndex + storyIndex) % 4
        const answers = [...item.distractors]
        answers.splice(order, 0, item.correct)
        return {
          type: 'reading' as const,
          title: `${level} ${topic} listening · ${story.title}`,
          description: `Listen to a ${level} ${topic.toLocaleLowerCase()} report and answer a comprehension question.`,
          source: 'DLPT listening practice',
          level,
          tag: 'DLPT-style listening',
          topic,
          url: '',
          embedUrl: '',
          passage: [story.passage, levelContext[language][level]].filter(Boolean).join('\n\n'),
          comprehension: [{
            prompt: item.prompt,
            answers,
            correctIndex: order,
          }],
        }
      }),
    ),
  )
}
