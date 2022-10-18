export type TypeKey = 'Algorithm' | 'Css' | 'DesignPattern' | 'Electron' | 'JavaScript' | 'VueSeries' | 'tools' | 'Essay'

export const blogType: {
  label: string,
  value: TypeKey | 'All'
}[] = [
  {
    label: '算法',
    value:'Algorithm'
  },
  {
    label: 'Css',
    value:'Css'
  },
  {
    label: '设计模式',
    value:'DesignPattern'
  },
  {
    label: 'Electron',
    value:'Electron'
  },
  {
    label: '随笔',
    value:'Essay'
  },
  {
    label: 'JavaScript',
    value:'JavaScript'
  },
  {
    label: '工具',
    value:'tools'
  },
  {
    label: 'Vue',
    value:'VueSeries'
  },
  {
    label: '全部',
    value: 'All'
  }
]

export type BlogList = {
  [key in TypeKey]: {
    title: string
    date: string
  }[]
}

export const blogList: BlogList = {
  Algorithm: [
    {
      title: '最接近的三数之和',
      date: '2022-08-17'
    },
    {
      title: '在排序数组中查找元素的第一个和最后一个位置',
      date: '2022-08-16'
    },
    {
      title: '移除元素',
      date: '2022-08-15'
    },
    {
      title: '寻找两个正序数组的中位数',
      date: '2022-08-14'
    },
    {
      title: '搜索插入位置',
      date: '2022-08-13'
    },
    {
      title: '四数之和',
      date: '2022-08-12'
    },
    {
      title: '盛水最多的容器',
      date: '2022-08-11'
    },
    {
      title: '删除数组中的重复项',
      date: '2022-08-10'
    },
    {
      title: '三数之和',
      date: '2022-08-09'
    },
    {
      title: '两数之和',
      date: '2022-08-08'
    },
    {
      title: '二叉搜索树',
      date: '2022-08-07'
    }
  ],
  Css: [],
  DesignPattern: [],
  Electron: [
    {
      title: 'Electron 在 windows 终端打印中文乱码的问题',
      date: '2022-09-22'
    }, {
      title: 'Electorn 安装失败解决方案',
      date: '2022-10-18'
    }
  ],
  Essay: [
    {
      title: '开个头吧',
      date: '2022-09-22'
    }, {
      title: '9月24日逛西湖',
      date: '2022-09-24'
    }, {
      title: '十一返杭之后被集中隔离的日子',
      date: '2022-10-13'
    }
  ],
  JavaScript: [
    {
      title: '深入了解requestAnimationFrame',
      date: '2022-06-12'
    },
    {
      title: '解决css动画抖动问题',
      date: '2022-06-07'
    },
    {
      title: '手写instanceof',
      date: '2022-02-20'
    },
    {
      title: 'Object.assign',
      date: '2022-01-23'
    },
    {
      title: 'JavaScript之继承',
      date: '2022-01-05'
    },
    {
      title: '原型-原型链',
      date: '2021-12-26'
    },
    {
      title: '手写 Map',
      date: '2021-08-15'
    }
  ],
  VueSeries: [{
    title: '为什么要用虚拟DOM',
    date: '2022-08-14'
  }],
  tools: [
    {
      title: 'fzip压缩工具',
      date: '2022-05-30'
    },
    {
      title: '解决github访问速度慢的问题',
      date: '2022-02-16'
    },
    {
      title: '代码规范',
      date: '2021-10-08'
    },
    {
      title: '如何使用github pages部署静态页面',
      date: '2021-08-22'
    }
  ]
}

export type Blog = {
  title: string
  link: string
  author: string
  date: string
  column: string
}

export const blogMap: {
  [key in TypeKey | 'All']: Blog[]
} = {
  Algorithm: [],
  Css: [],
  DesignPattern: [],
  Electron: [],
  JavaScript: [],
  VueSeries: [],
  tools: [],
  Essay: [],
  All: []
}
export let allBlog: Blog[] = []

blogType.forEach((item) => {
  if (blogList[item.value] && blogList[item.value]?.length > 0) {
    // @ts-ignore
    blogMap[item.value] = blogList[item.value].map((blog) => ({
      link: `/blogs/${item.value}/${blog.title}.html`,
      column: item.label,
      author: '向阳',
      ...blog
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } else {
    // @ts-ignore
    blogMap[item] = []
  }
})

for (const key in blogMap) {
  if (Object.prototype.hasOwnProperty.call(blogMap, key)) {
    const blog = blogMap[key]
    allBlog = allBlog.concat(blog)
  }
}

blogMap['All'] = allBlog

allBlog.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())