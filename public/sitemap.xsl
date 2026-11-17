<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap — Phillip Cantu</title>
        <style>
          :root { color-scheme: light; }
          body {
            margin: 0;
            font-family: Inter, ui-sans-serif, system-ui, sans-serif;
            background: #f7f5f2;
            color: #1c1917;
          }
          main { max-width: 52rem; margin: 0 auto; padding: 3rem 1.25rem 4rem; }
          h1 { font-size: 1.5rem; letter-spacing: -0.03em; margin: 0 0 0.5rem; }
          p { color: #57534e; margin: 0 0 1.5rem; }
          ol { list-style: none; margin: 0; padding: 0; }
          li { border-top: 1px solid #e7e5e4; padding: 0.85rem 0; }
          a { color: #1c1917; }
          time, .when { display: block; margin-top: 0.2rem; color: #78716c; font-size: 0.875rem; }
        </style>
      </head>
      <body>
        <main>
          <h1>Sitemap</h1>
          <xsl:choose>
            <xsl:when test="s:sitemapindex">
              <p>This index points at the page and post sitemaps.</p>
              <ol>
                <xsl:for-each select="s:sitemapindex/s:sitemap">
                  <li>
                    <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                    <xsl:if test="s:lastmod">
                      <span class="when">Updated <xsl:value-of select="s:lastmod"/></span>
                    </xsl:if>
                  </li>
                </xsl:for-each>
              </ol>
            </xsl:when>
            <xsl:otherwise>
              <p>
                <xsl:value-of select="count(s:urlset/s:url)"/> URLs.
              </p>
              <ol>
                <xsl:for-each select="s:urlset/s:url">
                  <li>
                    <a href="{s:loc}"><xsl:value-of select="s:loc"/></a>
                    <xsl:if test="s:lastmod">
                      <time><xsl:value-of select="s:lastmod"/></time>
                    </xsl:if>
                  </li>
                </xsl:for-each>
              </ol>
            </xsl:otherwise>
          </xsl:choose>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
