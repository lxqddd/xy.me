import rss from '@astrojs/rss'

// const blogImportResult = import.meta.globEager('./blogs/*.md')
// const blogs = Object.values(blogImportResult)

export const get = () =>
  rss({
    // 輸出的 xml 中的 `<title>` 字段
    title: '向阳的博客',
    // 输出的 xml 中的 `<description>` 字段
    description: '一个前端er，偶尔写一点东西',
    // RSS 中 `<item>` 链接的基础链接
    // 站点将使用项目下 astro.config 文件中的 `site` 配置项目
    site: import.meta.env.SITE,
    // 输出的 xml 中的 `<item>` 列表
    // 简单示例：为 `/src/pages` 中的每个 md 文件生成项目
    // 参见“生成项目”部分，了解需要的 frontmatter 和高级用例。
    items: import.meta.glob('./**/*.md'),
    // （可选）注入自定义 xml
    customData: `<language>zh-cn</language>`,
    stylesheet: '/rss/styles.xsl'
  })
