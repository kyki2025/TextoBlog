
/**
 * 关于页面组件 - 展示作者和书籍的详细信息
 */
import React from 'react';
import { Link } from 'react-router';
import { BookOpen, User, FileText, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-md">
        <h1 className="mb-6 text-3xl font-bold">关于《一人企业复利商业化》</h1>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-2/3">
            <p className="mb-4 text-lg">
              《一人企业复利商业化》精选了IDO老徐关于「一人企业」模式的四大核心板块：赚钱，避坑，写作，成长。
              每一页都可随时打开，随时查阅，随时思考。
            </p>
            <p className="text-lg">
              常看常新，值得看100遍，并输出每条内容的阅读思考，实战思考。一起成长，感谢阅读。
            </p>
          </div>
          <div className="flex md:w-1/3 md:justify-end">
            <div className="relative aspect-[2/3] w-40 overflow-hidden rounded-lg border-4 border-white shadow-lg">
              <img 
                src="https://pub-cdn.sider.ai/u/U01AHE70X2G/web-coder/6855718b6c4945f0aa7ff4d5/resource/85c05a46-0dd5-46f0-9e3d-4f2e5d3cfb4d.jpg" 
                alt="一人企业复利商业化书籍封面" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 作者介绍 */}
      <div className="mb-10">
        <div className="mb-8 flex items-center gap-2">
          <User className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">关于作者</h2>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/4">
            <div className="overflow-hidden rounded-lg">
              <img 
                src="https://pub-cdn.sider.ai/u/U01AHE70X2G/web-coder/6855718b6c4945f0aa7ff4d5/resource/3250b0cb-289c-4a60-a8f4-4b4c0660dddf.jpg" 
                alt="IDO老徐照片" 
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-3/4">
            <h3 className="mb-4 text-xl font-semibold">IDO老徐</h3>
            <p className="mb-4 text-gray-700">
              IDO老徐是一位专注于一人企业复利商业化模式的实践者和分享者。通过多年的实战经验，他摸索出了一套
              适合普通人实现商业价值的方法论。
            </p>
            <p className="mb-4 text-gray-700">
              「老徐合伙人」模式，是典型的「一人企业复利商业化」玩法。聚集1000位IP，互利共赢，放大商业化，
              产生「亿级商业化」规模。无员工，无办公场地，几乎无成本，赚的每一分收入，都是利润。
            </p>
            <p className="text-gray-700">
              这本书籍汇集了IDO老徐365条关于一人企业模式的精华思考，涵盖赚钱、避坑、写作和成长四个核心板块，
              为读者提供了一套完整的一人企业复利商业化思维体系。
            </p>
          </div>
        </div>
      </div>

      {/* 书籍核心理念 */}
      <div className="mb-10">
        <div className="mb-8 flex items-center gap-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">书籍核心理念</h2>
        </div>
        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <p className="mb-4 text-lg font-medium">一人企业的核心理念：</p>
            <ul className="mb-6 space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">•</span>
                <span>尽可能的把公司规模做小，标准化玩法，提高效率，探索商业化的最大可能性。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">•</span>
                <span>《老徐合伙人》模式，是典型的「一人企业复利商业化」玩法。聚集1000位IP，互利共赢，放大商业化。产生「亿级商业化」规模。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">•</span>
                <span>无员工，无办公场地。几乎无成本，赚的每一分收入，都是利润。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">•</span>
                <span>这是一家永不倒闭的公司。</span>
              </li>
            </ul>
            <p className="italic text-gray-600">一人企业的核心风险，是你这个人，这是最核心的变量，其他都不重要。</p>
          </CardContent>
        </Card>
      </div>

      {/* 书籍结构 */}
      <div className="mb-10">
        <div className="mb-8 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">书籍结构</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-green-50 hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="mb-3 text-xl font-bold text-green-700">一人企业·赚钱篇</h3>
              <p className="text-gray-700">
                探索复利商业化的方法与路径，从赚小钱开始，到建立稳定的收入体系。
                分享如何挖掘需求、解决问题、提供价值并实现商业化。
              </p>
              <div className="mt-4">
                <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-100">
                  <Link to="/content/money">查看内容</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-red-50 hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="mb-3 text-xl font-bold text-red-700">一人企业·避坑篇</h3>
              <p className="text-gray-700">
                识别常见陷阱，避免在商业化路上的弯路。
                帮助你避免盲目付费、远离收割性项目、提防虚假宣传，保护自己的时间和金钱。
              </p>
              <div className="mt-4">
                <Button asChild variant="outline" className="border-red-600 text-red-700 hover:bg-red-100">
                  <Link to="/content/pitfalls">查看内容</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="mb-3 text-xl font-bold text-blue-700">一人企业·写作篇</h3>
              <p className="text-gray-700">
                掌握内容创作，建立个人IP的核心方法。
                从养成写作习惯开始，到持续输出价值内容，形成自己的个人品牌和影响力。
              </p>
              <div className="mt-4">
                <Button asChild variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-100">
                  <Link to="/content/writing">查看内容</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50 hover:shadow-md">
            <CardContent className="p-6">
              <h3 className="mb-3 text-xl font-bold text-purple-700">一人企业·成长篇</h3>
              <p className="text-gray-700">
                持续精进自我，实现长期稳定的商业价值。
                分享思维方式、习惯养成、自我管理等方面的心得，帮助你在长期主义道路上走得更远。
              </p>
              <div className="mt-4">
                <Button asChild variant="outline" className="border-purple-600 text-purple-700 hover:bg-purple-100">
                  <Link to="/content/growth">查看内容</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 作者寄语 */}
      <div className="mb-10">
        <div className="mb-8 flex items-center gap-2">
          <Star className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">作者寄语</h2>
        </div>
        <div className="rounded-lg bg-gray-50 p-8">
          <blockquote className="mb-6 border-l-4 border-blue-500 pl-4 italic text-gray-700">
            <p className="mb-4">这本书籍，精选了IDO老徐关于「一人企业」模式的四大核心板块：赚钱，避坑，写作，成长。</p>
            <p className="mb-4">每一页都可随时打开，随时查阅，随时思考。每条内容之间，没有逻辑关系，不需要按顺序阅读。</p>
            <p>常看常新，值得看100遍，并输出每条内容的阅读思考，实战思考。</p>
          </blockquote>
          <p className="text-right text-sm text-gray-500">— IDO老徐，2025.01 深圳</p>
        </div>
      </div>

      {/* CTA部分 */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-center text-white shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">开始您的一人企业之旅</h2>
        <p className="mb-6">浏览365条精选内容，找到适合自己的复利商业化路径</p>
        <Button asChild className="bg-white text-blue-700 hover:bg-blue-50">
          <Link to="/content/money">立即开始</Link>
        </Button>
      </div>
    </div>
  );
};

export default About;
