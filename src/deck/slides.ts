/* ========== [COMMENT / 注释区] BEGIN ==========
 * BuildArena Commercial Share 的 slide 数据 SSOT。
 * 所有页面以数据形式进入 Zod 校验；沉浸式页面走 custom escape hatch。
 * dev-protocol/04 §5 要求 custom slide 指回 PROJECT-BRIEF §13 豁免登记。
 * ========== [COMMENT / 注释区] END ========== */

/* ========== [VARIABLE / 可变区] BEGIN [REQ-REF: §0.slide-decisions, §2 12 页大纲、素材与交互, §13.exemption-1] ==========
 * 10 页商业分享大纲来自 PROJECT-BRIEF §2。
 * 每页使用 componentKey="buildarena-showcase"，由 custom props schema 校验。
 * ========== [VARIABLE / 可变区] END ========== */

import { asset } from "@/utils/asset";

const componentKey = "buildarena-showcase";
const reqRef = "§13.exemption-1";

export const slides = [
  {
    type: "custom",
    id: "cover",
    componentKey,
    reqRef,
    props: {
      variant: "cover",
      eyebrow: "AI Builder\n如何创造生产力 · 北京 · 2026.05.24",
      title: "BuildArena：\nLLM 如何走进工程世界？",
      subtitle: "夏天 · 赛博园丁",
      assets: [
        { src: asset("assets/video/header_bridge.mp4"), label: "Bridge" },
      ],
      items: [
        { label: "AI4E Infrastructure" },
        { label: "AI Native Infrastructure" },
      ],
    },
  },
  {
    type: "custom",
    id: "motivation",
    componentKey,
    reqRef,
    props: {
      variant: "motivation",
      eyebrow: "为什么要聊生产力",
      title: "LLM 要成为真实生产力\n必须进入物理世界",
      subtitle: "文本和代码只是开始。真正改变生产方式的 AI，需要能设计、约束、验证并建造功能性实体。",
      verdict: "问题不是“LLM 能不能写出文本”，而是“它能不能在真实约束里创造结构”。",
      items: [
        { label: "自然语言", detail: "法律、合同、文档和知识工作，表达空间成熟，模型已经很熟。" },
        { label: "代码世界", detail: "代码可执行、可测试、可回滚，是 AI 变成工具的第一块试验田。" },
        { label: "物理实体", detail: "机械结构和真实场景有空间、材料、连接和安全边界，是 AI 走向物理世界生产力的最后一公里。" },
      ],
    },
  },
  {
    type: "custom",
    id: "result-first",
    componentKey,
    reqRef,
    props: {
      variant: "results",
      eyebrow: "先看结果",
      title: "从一句任务，\n到一个可运行的机械结构",
      subtitle: "9 个前沿 LLM，3 类工程任务，真实物理仿真验证。",
      assets: [
        {
          src: asset("assets/images/bridge_sample.gif"),
          alt: "Bridge construction",
          label: "桥梁建造",
          detail: "长程装配：大量模块需要持续保持空间一致性",
        },
        {
          src: asset("assets/images/construction_vehicle.gif"),
          alt: "Vehicle construction",
          label: "载具设计",
          detail: "开放式设计：没有给定设计目标，需要自己搜索方案",
        },
        {
          src: asset("assets/images/construction_racket.gif"),
          alt: "Rocket construction",
          label: "火箭结构",
          detail: "推力与结构：位置、朝向、功能目标必须同时满足",
        },
      ],
    },
  },
  {
    type: "custom",
    id: "failure-lab",
    componentKey,
    reqRef,
    props: {
      variant: "failure",
      eyebrow: "发现 1",
      title: "工程结果不是一段可以直接生成的文本",
      subtitle: "LLM 可以写出格式合法的工程文件，但 3D 空间的强硬约束无法保证。",
      verdict: "格式合法 ≠ 空间合法 ≠ 工程可建造",
    },
  },
  {
    type: "custom",
    id: "representation",
    componentKey,
    reqRef,
    props: {
      variant: "representation",
      eyebrow: "发现 2",
      title: "同样的信息，不同表示，效果完全不同",
      subtitle: "GUI 是面向人类的世界表示；LLM 需要适合推理、对齐约束的状态表示。",
      items: [
        {
          label: "GUI 界面",
          title: "信息完整，但操作接口灾难",
          detail: "3D 视觉、视角拖拽和精确点击，本身就消耗了模型大量能力。",
        },
        {
          label: "数学表示",
          title: "数学精确，但不等于模型好理解",
          detail: "LLM 很难稳定推理车轮滚动方向垂直于车轴这类 3D 关系。",
        },
        {
          label: "方向文本",
          title: "不一定最数学，但更适合推理",
          detail: "表示方式必须服务于 LLM 的认知结构，而不是服务于人类 GUI 习惯。",
        },
      ],
    },
  },
  {
    type: "custom",
    id: "framework",
    componentKey,
    reqRef,
    props: {
      variant: "framework",
      eyebrow: "发现 3",
      title: "逐步的约束检查和反馈是必须的",
      subtitle: "建造问题的答案不是最终产物，而是安全合法的过程。",
      assets: [
        {
          src: asset("assets/images/benchmark_framework.png"),
          alt: "BuildArena framework",
        },
      ],
      items: [
        { label: "目标指令", detail: "自然语言描述目标与约束" },
        { label: "智能体流程", detail: "规划 / 草图 / 评审 / 建造 / 引导" },
        { label: "3D 操作接口", detail: "让模型操作建造空间，而不是直接写文件" },
        { label: "物理仿真验证", detail: "结构必须进入物理引擎验证" },
      ],
    },
  },
  {
    type: "custom",
    id: "creativity",
    componentKey,
    reqRef,
    props: {
      variant: "creativity",
      eyebrow: "发现 4",
      title: "Infra 释放 LLM 的工程创造力",
      subtitle: "LLM 具有令人意外的工程创造力，只是需要正确的接口、表示和约束系统。",
      verdict: "LLM 不是在复述 token，而是在搜索设计空间",
      assets: [
        {
          src: asset("assets/images/construction_brige.gif"),
          alt: "Truss-like bridge",
          label: "桁架结构",
          detail: "Prompt 没有要求桁架，LLM 自主设计构造了相似力学结构。",
        },
        {
          src: asset("assets/images/bridge_cable.gif"),
          alt: "Cable-stayed bridge",
          label: "斜拉索桥梁结构",
          detail: "“桥梁”对于 LLM 不只是一个 token，而是完整的工程结构概念。",
        },
        {
          src: asset("assets/video/flyingcar.mp4"),
          alt: "Flying car",
          label: "火箭动力载具",
          detail: "面对开放性的任务需求，LLM 自主设计了火箭推进解决方案。",
        },
      ],
    },
  },
  {
    type: "custom",
    id: "infra",
    componentKey,
    reqRef,
    props: {
      variant: "infra",
      eyebrow: "AI4E 基础设施",
      title: "LLM 有巨大潜力，\n工程系统需要基础设施建设",
      verdict: "AI 的工程生产力，不只需要更强的模型，更需要模型与真实系统之间的基础设施。",
      items: [
        { label: "模型", title: "推理与规划", detail: "规划与创造" },
        { label: "表示", title: "状态转译", detail: "把工程状态转成可推理文本" },
        { label: "约束", title: "约束引擎", detail: "空间、连接、物理边界约束" },
        { label: "反馈", title: "反馈闭环", detail: "错误反馈作为重要优化信息" },
        { label: "仿真", title: "物理仿真验证", detail: "进入现实世界前的安全验收" },
      ],
    },
  },
  {
    type: "custom",
    id: "uniforce-industry",
    componentKey,
    reqRef,
    props: {
      variant: "industry",
      eyebrow: "关于西湖原力",
      title: "AI Native \n基础设施构建",
      subtitle: " ",
      verdict: "两个方向，同一个信念",
      items: [
        {
          label: "对外",
          title: "工业场景 AI 基础设施",
          detail: "为工业场景构建 AI 原生的操作接口、约束引擎与验证闭环，系统性解决设计、仿真、生产中的共性问题",
        },
        {
          label: "对内",
          title: "组织管理 AI 基础设施",
          detail: "用 AI 重建公司的信息流、决策流与执行流，把团队时间和精力从重复性执行层解放出来",
        },
      ],
    },
  },
  {
    type: "custom",
    id: "closing",
    componentKey,
    reqRef,
    props: {
      variant: "closing",
      title: "LLM 一定会走向现实世界\n约束、反馈和验证\n让智能变成可建造的生产力",
      subtitle: "夏天 · 西湖原力 UniForce AI",
      assets: [
        { src: asset("assets/images/tian_wechat.jpg"), alt: "微信二维码", label: "夏天", detail: "西湖原力工程总监" },
        { src: asset("assets/images/zhihong_wechat.jpg"), alt: "微信二维码", label: "孙志红", detail: "西湖原力人力资源主管" },
      ],
    },
  },
] as const;

/* ========== [VARIABLE / 可变区] END ========== */
