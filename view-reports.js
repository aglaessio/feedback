import supabase from './supabase-config.js';

async function fetchReports() {
    try {
        const { data, error } = await supabase
            .from('feedback')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const reportsList = document.getElementById('reportsList');
        reportsList.innerHTML = '';

        data.forEach(report => {
            const reportDiv = document.createElement('div');
            reportDiv.className = 'report-item';
            reportDiv.innerHTML = `
                <h2>${report.event_name}</h2>
                <p><strong>Técnico:</strong> ${report.technician_name}</p>
                <p><strong>Data de Chegada:</strong> ${report.arrival_datetime}</p>
                <p><strong>Horário de Abertura da Bilheteria:</strong> ${report.box_office_opening_time}</p>
                <p><strong>Quantidade de Bilheterias:</strong> ${report.box_office_count}</p>
                <p><strong>Horário de Abertura da Portaria:</strong> ${report.gate_opening_time}</p>
                <p><strong>Quantidade de Portarias:</strong> ${report.gate_count}</p>
                <p><strong>Internet Disponibilizada:</strong> ${report.internet_provided}</p>
                <p><strong>Outras Observações:</strong> ${report.other_observations}</p>
                <h3>Arquivos Anexados:</h3>
                <ul>
                    ${report.file_urls.map(url => `<li><a href="${url}" target="_blank">${url.split('/').pop()}</a></li>`).join('')}
                </ul>
                <hr>
            `;
            reportsList.appendChild(reportDiv);
        });
    } catch (error) {
        console.error('Erro ao buscar relatórios:', error);
        alert('Erro ao carregar relatórios. Tente novamente.');
    }
}

document.addEventListener('DOMContentLoaded', fetchReports);