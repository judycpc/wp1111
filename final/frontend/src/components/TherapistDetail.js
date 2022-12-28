import { useNavigate, useParams } from "react-router-dom";
import { Layout, Row, Col, Avatar, Card, Typography, Table, Tag, Button, Rate } from "antd";
import { RightOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Meta } = Card;
const { Title, Text, Paragraph } = Typography;

const zh_day = ['日', '一', '二', '三', '四', '五', '六'];

const TherapistDetail = () => {
  const { id } = useParams();

  const columns = new Array(28).fill(null).map((_, i) => {
    let d = new Date();
    d.setDate(d.getDate() + i + 1);
    const date = d.toLocaleDateString().slice(5);
    const day = zh_day[d.getDay()];
    return ({
      title: date + '(' + day + ')',
      dataIndex: date,
      align: 'center',
      render: (_, input) => {
        const intervals = input[date];
        if (!intervals) return;

        const output = intervals.map(({ hour, available }) => {
          return (
            <Tag
              key={date + '-' + hour}
              color={available ? 'success' : 'orange'}
              style={{ margin: '5px 0' }}
            >{("0" + hour).slice(-2) + ':00 - ' + ("0" + (hour + 1)).slice(-2) + ':00'}</Tag>
          )
        });

        return output;
      }
    })
  });

  const data = [
    {
      key: 0,
      '12/28': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
      '12/29': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
      '12/30': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
      '12/31': [{ hour: 9, available: false }, { hour: 10, available: true }, { hour: 11, available: true }],
    }
  ]

  const navigete = useNavigate();
  const toAppointment = (id) => navigete('/appointment/' + id);

  return (
    <Content style={{ backgroundColor: '#fff' }}>
      <Row justify='center' style={{ marginTop: 80 }}>
        <Col span={20} >
          <Card>
            <Meta
              avatar={
                <Avatar
                  src="https://img1.wsimg.com/isteam/ip/bc2e5cab-6169-4181-9e51-89df4fb88348/黃珮雯%20臨床心理師.jpg/:/cr=t:11.07%25,l:0%25,w:100%25,h:77.85%25/rs=w:365,h:365,cg:true"
                  size={128}
                  style={{ margin: '10px 40px 10px 10px' }}
                />
              }
              title={
                <Title
                  level={3}
                  color='#000000E0'
                  style={{ margin: '10px 0 8px 0' }}
                >XXX 治療師
                </Title>
              }
              description={
                <>
                  <Text color='#000000A0' style={{ fontSize: 18 }}>已完成 100 堂諮詢</Text>
                  <Paragraph style={{ marginTop: 12, fontSize: 18, color: '#000000A0' }}>
                    治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介 治療師簡介
                  </Paragraph>
                </>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row justify='center' style={{ marginTop: 20 }}>
        <Col span={20} style={{ padding: '10px 30px' }}>
          <Title
            level={3}
            color='#000000E0'
          >
            治療師簡歷
          </Title>
          <ul style={{ marginBottom: 0 }}>
            <li style={{ fontSize: 18, marginTop: 5 }}><Text color='#000000A0' style={{ fontSize: 'inherit' }} >簡歷一簡歷一簡歷一</Text></li>
            <li style={{ fontSize: 18, marginTop: 5 }}><Text color='#000000A0' style={{ fontSize: 'inherit' }}>簡歷二簡歷二簡歷二</Text></li>
            <li style={{ fontSize: 18, marginTop: 5 }}><Text color='#000000A0' style={{ fontSize: 'inherit' }}>簡歷三簡歷三簡歷三</Text></li>
          </ul>
        </Col>
      </Row>

      <Row justify='center' style={{ marginTop: 20 }}>
        <Col span={20} style={{ padding: '10px 30px' }}>
          <Title
            level={3}
            color='#000000E0'
          >
            諮詢時段
          </Title>
          <Text color='#0000E0' style={{ fontSize: 18, margin: 20 }}>綠色為可諮詢時段</Text>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: true }}
            pagination={false}
            style={{ margin: '20px' }}
          />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button size="large" type="text" onClick={() => toAppointment(id)} style={{ backgroundColor: '#fff2df' }}>預約諮詢<RightOutlined /></Button>

          </div>
        </Col>
      </Row>

      <Row justify='center' style={{ margin: '20px 0 80px 0' }}>
        <Col span={20} style={{ padding: '10px 30px' }}>
          <Title
            level={3}
            color='#000000E0'
          >
            諮詢評價
          </Title>
          <Card style={{ margin: 20 }}>
            <Meta
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Title level={4} color='#000000E0' style={{ margin: 0 }} >帳號名稱</Title>
                  <div style={{ marginLeft: 20 }}>
                    <Rate disabled allowHalf defaultValue={4.5} />
                    <span className="ant-rate-text" color="#000000E0">{4.5}</span>
                  </div>
                </div>
              }
              description={
                <Paragraph style={{ fontSize: 18, color: '#000000A0' }}>
                  諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價
                </Paragraph>}
            />
          </Card>
          <Card style={{ margin: 20 }}>
            <Meta
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Title level={4} color='#000000E0' style={{ margin: 0 }} >帳號名稱</Title>
                  <div style={{ marginLeft: 20 }}>
                    <Rate disabled allowHalf defaultValue={4.5} />
                    <span className="ant-rate-text" color="#000000E0">{4.5}</span>
                  </div>
                </div>
              }
              description={
                <Paragraph style={{ fontSize: 18, color: '#000000A0' }}>
                  諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價 諮詢評價
                </Paragraph>}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default TherapistDetail;