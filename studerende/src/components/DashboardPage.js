import React from "react";
import Dashboard from "./Dashboard";
import DashboardItem from "./DashboardItem";
import { Collapse, List } from "antd";
import "../App.css"
import Handin from "./Handin";
import Announcement from "./Announcement";
import Scheduler from "./Calendar";
import Mail from "./Mail";

const { Panel } = Collapse;

const ExSysData = [
  {
    title: 'Kursusplan',
    url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2887612_1&mode=reset'
  },
  {
    title: 'Litteratur',
    url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2973791_1&mode=reset'
  },
  {
    title: 'Projektbeskrivelse',
    url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2928844_1&mode=reset'
  },
  {
    title: 'Pensumliste',
    url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_3086990_1&mode=reset'
  },
  {
    title: 'Discussion Board',
    url: 'https://blackboard.au.dk/webapps/blackboard/content/launchLink.jsp?course_id=_145314_1&tool_id=_144_1&tool_type=TOOL&mode=view&mode=reset'
  },
  {
    title: 'Optaget forelæsninger',
    url: 'https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2998498_1&mode=reset'
  }
];

const ComArkData = [
  {
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
  }
];

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

const DashboardPage = () => {
  return (
    <div className={"dashboard"}>
        <Dashboard>
            <div key={1} data-grid={ { x: 0, y: 0, w: 10, h: 6, minW: 2, minH: 2 } }>
                <DashboardItem title={"Handins"} className={"handin-child"}>
                    <Handin />
                </DashboardItem>
            </div>
            <div key={2} data-grid={ { x: 10, y: 0, w: 24, h: 6, minW: 2, minH: 2 } }>
                <DashboardItem title={"Schedule"}>
                    <React.Fragment>
                        <Scheduler></Scheduler>
                    </React.Fragment>
                </DashboardItem>
            </div>
            <div key={3} data-grid={ { x: 34, y: 0, w: 10, h: 6, minW: 2, minH: 2 } }>
                <DashboardItem title={"Courses"}>
                    <Collapse bordered={false}>

                        <Panel header={<a href="https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145314_1&content_id=_2887285_1&mode=reset">Computerarkitektur, Netværk og Operativsystemer</a>} key="1">
                            <List
                                itemLayout="vertical"
                                dataSource={ComArkData}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    title={<a href={item.url}>{item.title}</a>}
                                    />
                                </List.Item>
                                )}
                            />
                        </Panel>
                        <Panel header={<a href="https://blackboard.au.dk/webapps/blackboard/content/listContent.jsp?course_id=_145325_1&content_id=_2887616_1&mode=reset">Eksperimentel Systemudvikling</a>} key="2">
                            <List
                                itemLayout="vertical"
                                dataSource={ExSysData}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    title={<a href={item.url}>{item.title}</a>}
                                    />
                                </List.Item>
                                )}
                            />
                        </Panel>
                        <Panel header={<a href="https://blackboard.au.dk/webapps/stll-eddi-BBLEARN/landing?course_id=_144946_1&mode=view">Numerisk Lineær Algebra</a>} key="3">
                            <List
                                itemLayout="vertical"
                                dataSource={NLAData}
                                renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                    title={<a href={item.url}>{item.title}</a>}
                                    />
                                </List.Item>
                                )}
                            />
                        </Panel>
                    </Collapse>,
                </DashboardItem>
            </div>
            <div key={4} data-grid={ { x: 0, y: 6, w: 22, h: 7, minW: 2, minH: 2 } }>
                <Mail />
            </div>
            <div key={5} data-grid={ { x: 22, y: 6, w: 22, h: 7, minW: 2, minH: 2 } }>
                <DashboardItem title={"Announcements"}>
                    <Announcement />
                </DashboardItem>
            </div>
        </Dashboard>
    </div>
  
  );
};

export default DashboardPage;
