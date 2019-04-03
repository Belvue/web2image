const puppeteer = require('puppeteer');
const fs = require('fs');

exports.paint = async function (data) {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    });
    const page = await browser.newPage();
    var contentHtml = `<html><body><item id="code"><style>${data.css}</style>${data.html}</item></body></html>`;
    await page.setContent(contentHtml);
    const selector = "body";
    const rect = await page.evaluate(selector => {
        const element = document.querySelector(selector).firstElementChild;
        if (!element) return null;
        const {
            x,
            y,
            width,
            height
        } = element.getBoundingClientRect();
        return {
            left: x,
            top: y,
            width,
            height,
            id: element.id
        };
    }, selector);
    if (rect) {
        screenshot = await page.screenshot({
            clip: {
                x: rect.left - 0,
                y: rect.top - 0,
                width: rect.width + (0 * 2) + 50,
                height: rect.height + (0 * 2)
            }
        })
        await browser.close();
        return screenshot;
    } else {
        await browser.close();
        return `💥 Can't find selector ${selector}`;
    }
};