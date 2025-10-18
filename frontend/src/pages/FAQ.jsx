import React from 'react';
import { Row, Col, Card, Typography, Space, Collapse, Tag } from 'antd';
import {
  QuestionCircleOutlined,
  RocketOutlined,
  SafetyOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function FAQ() {
  const categories = [
    {
      title: 'General Questions',
      icon: <QuestionCircleOutlined />,
      color: '#E63946',
      faqs: [
        {
          question: 'What is Golden Errands?',
          answer: 'Golden Errands is a comprehensive delivery and errand service operating across Ghana. We handle everything from food delivery to parcel shipping, grocery shopping, pharmaceutical deliveries, and personal errands - all with professionalism and care.',
        },
        {
          question: 'Which areas do you serve?',
          answer: 'We currently operate in major cities including Accra, Kumasi, Takoradi, Cape Coast, and Tamale. We are continuously expanding to serve more areas. Contact us to check if we serve your specific location.',
        },
        {
          question: 'How do I book a delivery?',
          answer: 'You can book a delivery through our online platform by logging in to your account, or by calling our hotline at 0256039212. Simply provide pickup and delivery details, and we\'ll handle the rest!',
        },
        {
          question: 'What are your operating hours?',
          answer: 'We operate 24/7! Our delivery services and customer support are available round the clock to meet your needs at any time.',
        },
      ],
    },
    {
      title: 'Pricing & Payments',
      icon: <DollarOutlined />,
      color: '#FFB703',
      faqs: [
        {
          question: 'How is delivery pricing calculated?',
          answer: 'Delivery pricing is based on distance, package size, urgency, and delivery type. You\'ll see the exact price before confirming your order. We offer competitive rates and volume discounts for businesses.',
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept multiple payment methods including Mobile Money (MTN, Vodafone, AirtelTigo), bank cards (Visa, Mastercard), bank transfers, and cash on delivery. You can choose your preferred payment method during checkout.',
        },
        {
          question: 'Are there any hidden charges?',
          answer: 'No! We believe in transparent pricing. The price you see during booking is the final price. There are no hidden fees or surprise charges.',
        },
        {
          question: 'Do you offer discounts for bulk orders?',
          answer: 'Yes! We offer attractive discounts for businesses and customers with regular delivery needs. Contact our sales team to discuss custom pricing packages tailored to your requirements.',
        },
      ],
    },
    {
      title: 'Delivery & Tracking',
      icon: <RocketOutlined />,
      color: '#0096FF',
      faqs: [
        {
          question: 'How long does delivery take?',
          answer: 'Delivery time varies based on distance and service type. Express deliveries within the same city typically take 30-90 minutes. Standard deliveries are completed within 2-6 hours. You can track your delivery in real-time.',
        },
        {
          question: 'Can I track my delivery?',
          answer: 'Absolutely! Once your order is confirmed, you\'ll receive a tracking link. You can monitor your delivery in real-time, see the rider\'s location, and receive notifications at each stage.',
        },
        {
          question: 'What if I\'m not available at delivery time?',
          answer: 'You can provide alternative delivery instructions, designate someone else to receive the package, or reschedule the delivery. Our riders will also contact you before arrival.',
        },
        {
          question: 'Do you offer same-day delivery?',
          answer: 'Yes! Same-day delivery is available for orders placed before 6 PM. We also offer express delivery for urgent items with delivery within 1-2 hours.',
        },
      ],
    },
    {
      title: 'Safety & Security',
      icon: <SafetyOutlined />,
      color: '#06d6a0',
      faqs: [
        {
          question: 'Are my packages insured?',
          answer: 'Yes! All deliveries include basic insurance coverage. For high-value items, we offer additional insurance options. In the rare event of damage or loss, we have a comprehensive claims process.',
        },
        {
          question: 'How do you ensure package safety?',
          answer: 'We use secure packaging, professional handling procedures, and GPS tracking. All riders are trained in proper handling techniques, especially for fragile or valuable items.',
        },
        {
          question: 'Are your riders verified?',
          answer: 'Yes! All our riders undergo thorough background checks, training, and verification before joining our team. They carry ID badges and you can view their profile in the app.',
        },
        {
          question: 'What items cannot be delivered?',
          answer: 'We cannot deliver illegal items, hazardous materials, weapons, or perishables that require special permits. Contact us if you\'re unsure about a specific item.',
        },
      ],
    },
    {
      title: 'Returns & Support',
      icon: <PhoneOutlined />,
      color: '#8338EC',
      faqs: [
        {
          question: 'What is your refund policy?',
          answer: 'If we fail to deliver your package or there\'s a service issue on our end, you\'re eligible for a full refund. Refunds are processed within 5-7 business days.',
        },
        {
          question: 'How do I report a problem?',
          answer: 'Contact our 24/7 customer support via phone (0256039212), email (support@goldenerrands.com), or through the platform. We take all concerns seriously and aim to resolve issues within 24 hours.',
        },
        {
          question: 'Can I cancel my order?',
          answer: 'Yes, you can cancel orders before pickup at no charge. Once a rider has been assigned and is en route to pickup, cancellation fees may apply.',
        },
        {
          question: 'Do you handle returns for online purchases?',
          answer: 'Yes! We offer return and exchange services for online shopping deliveries. Simply schedule a pickup and we\'ll return the item to the seller on your behalf.',
        },
      ],
    },
  ];

  return (
    <div style={{ background: '#fafafa' }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          padding: '100px 20px',
          textAlign: 'center',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <QuestionCircleOutlined style={{ fontSize: 64, marginBottom: 24 }} />
          <Title level={1} style={{ color: 'white', fontSize: 48, marginBottom: 16 }}>
            Frequently Asked Questions
          </Title>
          <Paragraph style={{ fontSize: 20, color: 'white', maxWidth: 700, margin: '0 auto' }}>
            Find answers to common questions about our services, pricing, and policies
          </Paragraph>
        </div>
      </section>

      {/* FAQ Categories */}
      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {categories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <Card
                  bordered={false}
                  style={{
                    marginBottom: 16,
                    borderLeft: `4px solid ${category.color}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  <Space size="middle">
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: `${category.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {React.cloneElement(category.icon, {
                        style: { fontSize: 24, color: category.color },
                      })}
                    </div>
                    <Title level={3} style={{ margin: 0 }}>
                      {category.title}
                    </Title>
                    <Tag color={category.color}>{category.faqs.length} Questions</Tag>
                  </Space>
                </Card>

                <Collapse
                  bordered={false}
                  expandIconPosition="end"
                  items={category.faqs.map((faq, faqIndex) => ({
                    key: `${categoryIndex}-${faqIndex}`,
                    label: (
                      <Text strong style={{ fontSize: 16 }}>
                        {faq.question}
                      </Text>
                    ),
                    children: (
                      <Paragraph style={{ fontSize: 15, color: '#666', margin: 0 }}>
                        {faq.answer}
                      </Paragraph>
                    ),
                  }))}
                  style={{ background: 'white', marginBottom: 32 }}
                />
              </div>
            ))}
          </Space>
        </div>
      </section>

      {/* Still Have Questions */}
      <section
        style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #E63946 0%, #C1121F 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <PhoneOutlined style={{ fontSize: 64, color: '#FFB703', marginBottom: 24 }} />
          <Title level={2} style={{ color: 'white' }}>
            Still Have Questions?
          </Title>
          <Paragraph style={{ fontSize: 18, color: 'white', maxWidth: 600, margin: '0 auto 32px' }}>
            Our support team is available 24/7 to help you with any questions or concerns
          </Paragraph>

          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={12} md={8}>
              <Card bordered={false} style={{ textAlign: 'center' }}>
                <PhoneOutlined style={{ fontSize: 40, color: '#E63946', marginBottom: 16 }} />
                <Title level={4}>Call Us</Title>
                <Space direction="vertical" size="small">
                  <Text>0256039212</Text>
                  <Text>0256039213</Text>
                  <Text>0256039214</Text>
                </Space>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card bordered={false} style={{ textAlign: 'center' }}>
                <ClockCircleOutlined style={{ fontSize: 40, color: '#FFB703', marginBottom: 16 }} />
                <Title level={4}>Email Us</Title>
                <Space direction="vertical" size="small">
                  <Text>support@goldenerrands.com</Text>
                  <Text>info@goldenerrands.com</Text>
                  <Text style={{ color: '#06d6a0' }}>Response within 2-4 hours</Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
}
