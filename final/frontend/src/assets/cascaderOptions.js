const options = [
    {
        label: '發展',
        value: '發展',
        children: ['自閉症', '過動症', '智能障礙'].map(e => { return { label: e, value: e } })
    },
    {
        label: '思覺失調',
        value: '思覺失調',
        // children: [
        //     {
        //         label: '思覺失調',
        //         value: '思覺失調',
        //     }
        // ]
    },
    {
        label: '躁鬱',
        value: '躁鬱',
        children: [
            {
                label: '躁鬱症',
                value: '躁鬱症',
            }
        ]
    },
    {
        label: '憂鬱',
        value: '憂鬱',
        children: [
            {
                label: '抑鬱症',
                value: '抑鬱症',
            }
        ]
    },
    {
        label: '焦慮',
        value: '焦慮',
        children: [
            {
                label: '焦慮症',
                value: '焦慮症',
            }
        ]
    },
    {
        label: '強迫',
        value: '強迫',
        children: [
            {
                label: '強迫症',
                value: '強迫症',
            }
        ]
    },
    {
        label: '壓力',
        value: '壓力',
        children: ['急性應激障礙', '創傷後應激障礙'].map(e => { return { label: e, value: e } })
    },
    {
        label: '身體',
        value: '身體',
        children: ['身體化症', '慮病症', '身體畸形障礙'].map(e => { return { label: e, value: e } })
    },
    {
        label: '飲食',
        value: '飲食',
        children: ['厭食症', '暴食症'].map(e => { return { label: e, value: e } })
    },
    {
        label: '醒覺',
        value: '醒覺',
        children: [
            {
                label: '睡眠異常',
                value: '睡眠異常'
            }
        ]
    },
    {
        label: '成癮',
        value: '成癮',
        children: [
            {
                label: '物質濫用',
                value: '物質濫用'
            }
        ]
    },
    {
        label: '神經',
        value: '神經',
        children: ['失智症', '譫妄症'].map(e => { return { label: e, value: e } })
    },
    {
        label: '人格',
        value: '人格',
        children: ['妄想型人格', '反社會人格', '邊緣型人格', '戲劇化人格', '自戀型人格', '迴避型人格', '依賴型人格', '強迫性人格'].map(e => { return { label: e, value: e } })
    }
];

export default options;