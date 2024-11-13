async function getIP(domain) {
    try {
        const response = await fetch(`https://dns.google/resolve?name=${domain}`);
        if (!response.ok) throw new Error('Ошибка запроса к API');
        const data = await response.json();

        const ipAddress = data.Answer?.find(record => record.type === 1)?.data;
        return ipAddress || 'IP адрес не найден';
    } catch (error) {
        console.error(error);
        return 'Ошибка получения IP';
    }
}

document.getElementById('getIpButton').addEventListener('click', async () => {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const url = new URL(tabs[0].url);
    const domain = url.hostname;

    const ip = await getIP(domain);
    document.getElementById('result').textContent = `IP Address: ${ip}`;
});
