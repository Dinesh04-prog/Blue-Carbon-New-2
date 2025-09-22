import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { HelpCircle, Book, DollarSign, Shield, Globe } from 'lucide-react';
import { useTranslation } from '../contexts/TranslationContext';

export function FAQ() {
  const { t } = useTranslation();
  
  const faqCategories = [
    {
      title: t('faq.understandingBlueCarbon'),
      icon: HelpCircle,
      color: 'bg-blue-100 text-blue-800',
      questions: [
        {
          question: t('faq.whatAreBlueCarbonCredits'),
          answer: 'Blue carbon credits are verified carbon offsets generated from the protection, restoration, and sustainable management of coastal and marine ecosystems like mangroves, seagrass meadows, and salt marshes. These ecosystems are among the most carbon-rich habitats on Earth, storing 3-10 times more carbon per hectare than terrestrial forests.'
        },
        {
          question: t('faq.howDoBlueCarbonEcosystems'),
          answer: 'Blue carbon ecosystems sequester carbon both above and below ground. Mangroves store carbon in their biomass and in deep, waterlogged sediments where oxygen-poor conditions prevent decomposition. Seagrasses capture carbon through photosynthesis and store it in their root systems and sediments. Salt marshes accumulate carbon in their soils through plant matter decomposition in anaerobic conditions.'
        },
        {
          question: t('faq.whyMoreEffectiveThanForests'),
          answer: 'Blue carbon ecosystems can store carbon for millennia in waterlogged sediments where decomposition is extremely slow. They sequester carbon up to 10 times faster than terrestrial forests and store 3-5 times more carbon per unit area. Additionally, they provide multiple co-benefits including coastal protection, biodiversity habitat, and sustainable livelihoods.'
        },
        {
          question: t('faq.differenceBetweenBlueGreenBrown'),
          answer: 'Blue carbon refers to carbon stored in coastal and marine ecosystems. Green carbon is stored in terrestrial vegetation and soils (forests, grasslands). Brown carbon refers to carbon stored in peatlands and wetlands. Blue carbon is unique because it can be stored for thousands of years in marine sediments and provides additional benefits like coastal protection.'
        }
      ]
    },
    {
      title: t('faq.purchasingMarketplace'),
      icon: DollarSign,
      color: 'bg-green-100 text-green-800',
      questions: [
        {
          question: t('faq.howToPurchase'),
          answer: 'Simply browse our marketplace, select the projects that align with your values and budget, and complete your purchase using our secure payment system. You\'ll receive digital certificates immediately, with all transactions recorded on the blockchain for transparency and traceability.'
        },
        {
          question: 'What do I get when I purchase credits?',
          answer: 'You receive verified digital certificates showing your carbon offset, detailed project information, impact metrics, and blockchain-verified proof of retirement. You also get access to your personal dashboard to track your environmental impact and receive updates on project progress.'
        },
        {
          question: 'How is pricing determined?',
          answer: 'Pricing reflects project development costs, monitoring expenses, certification fees, community benefits, and market demand. Premium projects with additional co-benefits (biodiversity protection, community development) may have higher prices. Our transparent pricing ensures fair compensation for project developers and communities.'
        },
        {
          question: 'Can I purchase credits on behalf of my business?',
          answer: 'Yes! We support business accounts with features like bulk purchasing, corporate reporting, ESG integration, and branded certificates. Business accounts can track employee engagement and integrate carbon offsetting into their sustainability reporting and net-zero strategies.'
        },
        {
          question: 'Are there minimum purchase requirements?',
          answer: 'Individual credits can be purchased starting from 1 tonne CO₂, while bulk discounts are available for purchases over 100 tonnes. Project developers may set minimum purchase amounts for specific projects based on their operational requirements.'
        }
      ]
    },
    {
      title: 'Verification & Standards',
      icon: Shield,
      color: 'bg-purple-100 text-purple-800',
      questions: [
        {
          question: 'How are blue carbon projects verified?',
          answer: 'All projects undergo rigorous third-party verification by internationally recognized standards including VCS (Verified Carbon Standard), Gold Standard, Plan Vivo, and Climate Action Reserve. Verification includes baseline assessments, methodology validation, and regular monitoring by accredited verifiers.'
        },
        {
          question: 'What certification standards do you accept?',
          answer: 'We accept projects certified under VCS, Gold Standard, Plan Vivo, Climate Action Reserve, and other internationally recognized standards. Each standard has specific requirements for measurement, reporting, verification, and ongoing monitoring to ensure credit quality and permanence.'
        },
        {
          question: 'How do you ensure additionality?',
          answer: 'Additionality means the carbon sequestration would not have occurred without the project. We verify this through baseline assessments, policy analysis, and barrier assessments. Projects must demonstrate they go beyond business-as-usual scenarios and legal requirements.'
        },
        {
          question: 'What about permanence and leakage?',
          answer: 'Permanence is addressed through long-term monitoring, legal protections, community engagement, and buffer pools. Leakage (shifting emissions elsewhere) is prevented through comprehensive project boundaries and monitoring of surrounding areas. Projects include risk assessments and mitigation strategies.'
        },
        {
          question: 'How often are projects monitored?',
          answer: 'Projects undergo annual monitoring visits, quarterly remote sensing analysis, and continuous community reporting. Monitoring includes carbon stock assessments, biodiversity surveys, socioeconomic impact evaluations, and verification of co-benefits delivery.'
        }
      ]
    },
    {
      title: 'Impact & Benefits',
      icon: Globe,
      color: 'bg-teal-100 text-teal-800',
      questions: [
        {
          question: 'What co-benefits do blue carbon projects provide?',
          answer: 'Beyond carbon sequestration, blue carbon projects provide coastal protection from storms and erosion, marine biodiversity habitat, sustainable fisheries, eco-tourism opportunities, community employment, water quality improvement, and cultural preservation for indigenous and local communities.'
        },
        {
          question: 'How do projects support local communities?',
          answer: 'Projects create employment opportunities, provide training and capacity building, support sustainable livelihoods like eco-tourism and sustainable fishing, fund community infrastructure, and ensure meaningful participation in project governance and benefit-sharing agreements.'
        },
        {
          question: 'What is the impact on marine biodiversity?',
          answer: 'Blue carbon ecosystems support incredibly rich biodiversity, serving as nurseries for fish, feeding grounds for marine mammals, and habitat for countless species. Projects often result in measurable increases in species abundance and diversity, contributing to ocean health and fisheries sustainability.'
        },
        {
          question: 'How do you measure and report impact?',
          answer: 'We use standardized metrics including carbon sequestration rates, area protected/restored, species counts, community employment numbers, income generation, and coastal protection values. Impact is reported through annual project reports, real-time dashboards, and third-party impact assessments.'
        }
      ]
    }
  ];

  const resources = [
    {
      title: 'Blue Carbon Science Guide',
      description: 'Comprehensive scientific overview of blue carbon ecosystems',
      icon: Book
    },
    {
      title: 'Market Trends Report',
      description: 'Latest developments in blue carbon markets and pricing',
      icon: DollarSign
    },
    {
      title: 'Project Developer Guide',
      description: 'How to develop and list blue carbon projects',
      icon: Shield
    },
    {
      title: 'Business Integration Guide',
      description: 'Incorporating blue carbon into corporate strategies',
      icon: Globe
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">
              {t('faq.title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => {
              const CategoryIcon = category.icon;
              return (
                <div key={categoryIndex}>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <CategoryIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl text-gray-900">{category.title}</h2>
                      <Badge className={category.color}>
                        {category.questions.length} questions
                      </Badge>
                    </div>
                  </div>

                  <Card className="p-6">
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Additional Resources */}
          <div className="mt-20">
            <h2 className="text-3xl mb-8 text-center text-gray-900">Additional Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => {
                const ResourceIcon = resource.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <ResourceIcon className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg mb-2 text-center text-gray-900">{resource.title}</h3>
                    <p className="text-gray-600 text-center text-sm">{resource.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Support */}
          <Card className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-teal-50">
            <div className="text-center">
              <h3 className="text-2xl mb-4 text-gray-900">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our BlueMitra expert team is here to help you understand blue carbon credits and find the right 
                projects for your environmental goals. Get in touch for personalized support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Badge className="bg-blue-600 px-6 py-2 text-base">
                  📧 support@bluemitra.com
                </Badge>
                <Badge className="bg-teal-600 px-6 py-2 text-base">
                  📞 +1 (555) 123-MITRA
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}