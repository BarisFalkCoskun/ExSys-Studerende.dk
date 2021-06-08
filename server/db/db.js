const Database = require('better-sqlite3')
const path = require('path')
const dbName = path.join(__dirname, 'blackboard.db')
const db = new Database(dbName)

// db.prepare('CREATE TABLE IF NOT EXISTS handin(id INTEGER PRIMARY KEY, class_name TEXT, color TEXT, content TEXT, days_used INTEGER, deadline DATETIME, given_points INTEGER, element TEXT, height INTEGER, measurement TEXT, percent TEXT, total_days INTEGER, status TEXT, title TEXT, total_points INTEGER, type TEXT, width INTEGER)').run()

db.prepare('CREATE TABLE IF NOT EXISTS handin(json TEXT PRIMARY KEY)').run()

db.prepare('CREATE TABLE IF NOT EXISTS announcement(json TEXT PRIMARY KEY)').run()

db.prepare('CREATE TABLE IF NOT EXISTS mail(json TEXT PRIMARY KEY)').run()

db.prepare('CREATE TABLE IF NOT EXISTS uploaded(handin BLOB PRIMARY KEY)').run()

db.prepare('CREATE TABLE IF NOT EXISTS course_menu(json TEXT PRIMARY KEY)').run()

class Content {
  static allHandins () {
    return db.prepare('SELECT * FROM handin').all()
  }

  static allAnnouncements () {
    return db.prepare('SELECT * FROM announcement').all()
  }

  static allMails () {
    return db.prepare('SELECT * FROM mail').all()
  }

  static allCourses () {
    return db.prepare('SELECT * FROM course_menu').all()
  }

  static insertHandins () {
    const data = [
      {
        class_name: null,
        course: "Computerarkitektur, Netværk og Operativsystemer",
        course_nickname: "ComArk",
        days_total: 14,
        days_used: 6,
        deadline: "2021-05-22",
        height: 45,
        id: 1,
        icon: {
          class_name: "upload-file",
          color: "rgb(16, 142, 233)",
          height: 45,
          icon: "uploadOption",
          width: 45,
        },
        measurement: "days",
        percent: null,
        points_given: 0,
        points_total: 0,
        status: null,
        title: "TCP",
        type: "circle",
        url: "https://blackboard.au.dk/bbcswebdav/pid-3083819-dt-content-rid-11124029_1/xid-11124029_1",
        width: 45
      },
       {
        class_name: "not-uploaded",
        course: "Eksperimentel Systemudvikling",
        course_nickname: "ExSys",
        days_total: 31,
        days_used: 30,
        deadline: "2021-05-14",
        height: 45,
        id: 2,
        icon: {
          class_name: "upload-file",
          color: "rgb(16, 142, 233)",
          height: 45,
          icon: "uploadOption",
          width: 45,
        },
        measurement: "days",
        percent: null,
        points_given: 0,
        points_total: 0,
        status: null,
        title: "Aflevering 5",
        type: "circle",
        url: "https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_3077946_1&mode=reset",
        width: 45
      },
        {
        class_name: null,
        course: "Numerisk Lineær Algebra",
        course_nickname: "NLA",
        days_total: 0,
        days_used: 0,
        deadline: null,
        height: 45,
        id: 3,
        icon: {
          class_name: null,
          color: null,
          height: 0,
          icon: null,
          width: 0,
        },
        measurement: "done",
        percent: 100,
        points_given: 0,
        points_total: 0,
        status: "exception",
        title: "Aflevering 9",
        type: "circle",
        url: "https://blackboard.au.dk/bbcswebdav/pid-3077261-dt-content-rid-11069117_1/xid-11069117_1",
        width: 45
      },
        {
        class_name: null,
        course: "Computerarkitektur, Netværk og Operativsystemer",
        course_nickname: "ComArk",
        days_total: 0,
        days_used: 0,
        deadline: null,
        height: 45,
        id: 4,
        icon: {
          class_name: null,
          color: null,
          height: 0,
          icon: null,
          width: 0,
        },
        measurement: "points",
        percent: 0,
        points_given: 11,
        points_total: 12,
        status: "success",
        title: "TCP Tunneling",
        type: "circle",
        url: "https://blackboard.au.dk/bbcswebdav/pid-3077954-dt-content-rid-11075671_1/xid-11075671_1",
        width: 45
      },
        {
        class_name: null,
        course: "Numerisk Lineær Algebra",
        course_nickname: "NLA",
        days_total: 0,
        days_used: 0,
        deadline: null,
        height: 45,
        id: 5,
        icon: {
          class_name: null,
          color: null,
          height: 0,
          icon: null,
          width: 0,
        },
        measurement: "done",
        percent: 100,
        points_given: 0,
        points_total: 0,
        status: "success",
        title: "Aflevering 8",
        type: "circle",
        url: "https://blackboard.au.dk/bbcswebdav/pid-3071342-dt-content-rid-11031942_1/xid-11031942_1",
        width: 45
      }
    ]

    for (let i = 0; i < data.length; i++)  {
      db.prepare('INSERT or REPLACE INTO handin(json) VALUES (?)').run(JSON.stringify(data))
    }
  }

  static insertUploadedHandin (data) {
    db.prepare('INSERT or REPLACE INTO uploaded(handin) VALUES (?)').run(data)
  }
  

  static insertAnnouncements () {
    const data = [
      {
        id: 6,
        course: "F21 - Eksperimentel systemudvikling [520171U019]",
        title: "Daily Notifications",
        content: "Kære alle, Til dagens forelæsning vil vi gennemgå projektrapporten, eksamenstemear og lidt omkring forberedelse til eksamen mm. I mine slides fra i mandags skrev jeg at vi ville have kursusevaluering på onsdag, men jeg synes lige I skal have lidt tid til at gennemføre evalueringen på Blackboard (og måske prioritere aflevering 5), så vi venter med kursusevalueringen til næste mandag. Det fremgår også af kursusplanen. I de næste par uger (20, 21, 22) vil der være spørgetime om onsdagen. Her er det vigtigt at I forbereder spørgsmål og jeg vil tage dele af litteraturlisten hver gang. Det er primært for at undgå at alle stiller alle deres spørgsmål til hele pensum den sidste onsdag. Vi ses i eftermiddag, Henrik"
      },
      {
        id: 7,
        course: "F21 - Numerisk lineær algebra [550191U006]",
        title: "Afleveringsopgaver",
        content: "Alle 10 afleveringsopgaver i numerisk lineær algebra er nu stillet.  Husk at I skal have 8 ud af 10 godkendt for at deltage i eksamen.  Afleveringsfrister bestemmes af din instruktor, og sidste frister for godkendelse ligger i denne måned om et par uger. Mvh Andrew"
      },
      {
        id: 8,
        course: "F21 - Numerisk lineær algebra [550191U006]",
        title: "Instruktoransøgning på mat E21",
        content: "Det er nu åbnet for ansøgninger til at være instruktor på matematik her til efteråret. Ansøgningen er nu live via https://data.math.au.dk/apps/instruktor/ I kan se hvilke kurser der er brug for instruktor på når I er logget på.  Der er deadline torsdag den 3. juni, 2021."
      }
    ]

    for (let i = 0; i < data.length; i++)  {
      db.prepare('INSERT or REPLACE INTO announcement(json) VALUES (?)').run(JSON.stringify(data))
    }
  }

  static insertMails () {
    const data = [
      {
        id: 9,
        from: "reeksamen@math.au.dk",
        date: "2021-05-14 12:03",
        title: "Re-eksamens-MatLab i Introduktion til sandsynlighedsteori og statistik",
        content: "Kære studerende Vi har planlagt re-eksamens-MatLab torsdag d. 20. maj kl. 15-18 på zoom i kurset ”introduktion til sandsynlighedsteori og statistik”."
      },
      {
        id: 10,
        from: "test@totally.legitimate.mail.au.dk",
        date: "2021-05-14 13:37",
        title: "Du kan både slette og besvarer mails!",
        content: "Prøv selv ved at klikke på ikonerne til venstre!"
      },
      {
        id: 11,
        from: "do-not-reply@blackboard.au.dk",
        date: "2021-05-11 16:28",
        title: "Daily Notifications",
        content: "Discussions 5 new posts F21 - Numerisk lineær algebra [550191U006] (BB-Cou-UUVA-94443) Other new content Noter 27 added F21 - Numerisk lineær algebra [550191U006] (BB-Cou-UUVA-94443) Uge 15: Projektrapport og eksamen added F21 - Eksperimentel systemudvikling [520171U019] (BB-Cou-UUVA-94703) Uge 15: Projektrapport og eksamen added F21 - Eksperimentel systemudvikling [520171U019] (BB-Cou-UUVA-94703)"
      }
    ]

    for (let i = 0; i < data.length; i++)  {
      db.prepare('INSERT or REPLACE INTO mail(json) VALUES (?)').run(JSON.stringify(data))
    }
  }

  static insertCourseMenus() {
    const data = [
      {
      course: "Eksperimentel Systemudvikling",
      url: "https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2887616_1&mode=reset",
      menu: [{
        title: 'Kursusplan',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2887612_1&mode=reset',
      },
      {
        title: 'Litteratur',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2973791_1&mode=reset',
      },
      {
        title: 'Projektbeskrivelse',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2928844_1&mode=reset',
      },
      {
        title: 'Pensumliste',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_3086990_1&mode=reset',
      },
      {
        title: 'Discussion Board',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/launchLink.jsp?course_id=_145314_1&tool_id=_144_1&tool_type=TOOL&mode=view&mode=reset',
      },
      {
        title: 'Optaget forelæsninger',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2998498_1&mode=reset',
      }],
    }, {
    course: "ComArk",
    url: "https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145314_1&content_id=_2887285_1&mode=reset",
    menu: [{
        title: 'Course Plan',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145314_1&content_id=_2887281_1&mode=reset'
      },
      {
        title: 'Material (public)',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145314_1&content_id=_2887283_1&mode=reset'
      },
      {
        title: 'Handins',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145314_1&content_id=_2887280_1&mode=reset'
      },
      {
        title: 'Announcements',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/launchLink.jsp?course_id=_145314_1&tool_id=_136_1&tool_type=TOOL&mode=view&mode=reset'
      },
      {
        title: 'Discussion Board',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/launchLink.jsp?course_id=_145314_1&tool_id=_144_1&tool_type=TOOL&mode=view&mode=reset'
      },
      {
        title: 'Exam',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145314_1&content_id=_2887279_1&mode=reset'
      }]
    }, {
    course: "Numerisk Lineær Algebra",
    url: "https://blackboard.au.dk/webapps/stll-eddi-BBLEARN/landing?course_id=_144946_1&mode=view",
    menu: [
      {
        title: 'Kursusplan',
        url: 'https://blackboard.au.dk/webapps/blackboard/execute/content/blankPage?cmd=view&content_id=_2986494_1&course_id=_144946_1&mode=reset'
      },
      {
        title: 'Opgaver',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_144946_1&content_id=_2994082_1&mode=reset'
      },
      {
        title: 'zoom forelæsninger',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/launchLink.jsp?course_id=_144946_1&tool_id=_2823_1&tool_type=TOOL&mode=view&mode=reset'
      },
      {
        title: 'Announcements',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/launchLink.jsp?course_id=_144946_1&tool_id=_136_1&tool_type=TOOL&mode=view&mode=reset'
      },
      {
        title: 'Matlab',
        url: 'https://blackboard.au.dk/webapps/blackboard/execute/content/blankPage?cmd=view&content_id=_2986980_1&course_id=_144946_1&mode=reset'
      },
      {
        title: 'Noter',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_144946_1&content_id=_2996066_1&mode=reset'
      }
    ]
    }];

    const NLAData = [
      {
        title: 'Kursusplan',
        url: 'https://blackboard.au.dk/webapps/blackboard/execute/content/blankPage?cmd=view&content_id=_2986494_1&course_id=_144946_1&mode=reset'
      },
      {
        title: 'Opgaver',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_144946_1&content_id=_2994082_1&mode=reset'
      },
      {
        title: 'zoom forelæsninger',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/launchLink.jsp?course_id=_144946_1&tool_id=_2823_1&tool_type=TOOL&mode=view&mode=reset'
      },
      {
        title: 'Announcements',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/launchLink.jsp?course_id=_144946_1&tool_id=_136_1&tool_type=TOOL&mode=view&mode=reset'
      },
      {
        title: 'Matlab',
        url: 'https://blackboard.au.dk/webapps/blackboard/execute/content/blankPage?cmd=view&content_id=_2986980_1&course_id=_144946_1&mode=reset'
      },
      {
        title: 'Noter',
        url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_144946_1&content_id=_2996066_1&mode=reset'
      }
    ];

    for (let i = 0; i < data.length; i++)  {
      db.prepare('INSERT or REPLACE INTO course_menu(json) VALUES (?)').run(JSON.stringify(data))
    }
  }
}


module.exports = db
module.exports.Content = Content
