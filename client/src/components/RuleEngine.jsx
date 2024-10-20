// client/src/components/RuleEngine.js
import  { useState } from 'react';
import './RuleEngine.css'; // We'll create this CSS file next.

const RuleEngine = () => {
    const [ruleName, setRuleName] = useState('');
    const [ruleString, setRuleString] = useState('');
    const [combineRules, setCombineRules] = useState([{ rule: '', operator: 'AND' }]);
    const [ast, setAST] = useState('');
    const [data, setData] = useState('');
    const [result, setResult] = useState(null);

    const generateTreeHTML = (node, prefix = '', isLeft = true) => {
        if (!node) return '';
        let treeHTML = '';
        treeHTML += prefix + (isLeft ? '├── ' : '└── ') + (node.type === 'operator' ? node.operator : `${node.key} ${node.operator} ${node.value}`) + '<br>';
        if (node.left) treeHTML += generateTreeHTML(node.left, prefix + (isLeft ? '│   ' : '    '), true);
        if (node.right) treeHTML += generateTreeHTML(node.right, prefix + (isLeft ? '│   ' : '    '), false);
        return treeHTML;
    };

    const handleCreateRule = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/create_rule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ruleName, ruleString }),
        });
        const result = await response.json();
        document.getElementById('create-rule-result').innerHTML = generateTreeHTML(result.ruleAST);
    };

    const handleAddRule = () => {
        setCombineRules([...combineRules, { rule: '', operator: 'AND' }]);
    };

    const handleCombineRules = async (e) => {
        e.preventDefault();
        const rules = combineRules.map((r) => r.rule);
        const response = await fetch('/api/combine_rules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rules, op: combineRules[0].operator }),
        });
        const result = await response.json();
        document.getElementById('combine-rules-result').innerHTML = generateTreeHTML(result.ruleAST);
    };

    const handleEvaluateRule = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/evaluate_rule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ast, data: JSON.parse(data) }),
        });
        const result = await response.json();
        setResult(result);
    };

    return (
        <div className="container">
            <h1>Rule Engine Application</h1>

            <h2>Create Rule</h2>
            <form onSubmit={handleCreateRule}>
                <div>
                    <label htmlFor="ruleName">Rule Name:</label>
                    <input type="text" id="ruleName" value={ruleName} onChange={(e) => setRuleName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="ruleString">Rule:</label>
                    <input type="text" id="ruleString" value={ruleString} onChange={(e) => setRuleString(e.target.value)} required />
                </div>
                <button type="submit">Create Rule</button>
            </form>
            <pre id="create-rule-result"></pre>

            <h2>Combine Rules</h2>
            <form onSubmit={handleCombineRules}>
                <h3>Enter Rules to Combine:</h3>
                {combineRules.map((rule, index) => (
                    <div key={index} className="rule-container">
                        <label htmlFor={`combine-rule${index + 1}`}>Rule {index + 1}:</label>
                        <input type="text" id={`combine-rule${index + 1}`} value={rule.rule} onChange={(e) => {
                            const newRules = [...combineRules];
                            newRules[index].rule = e.target.value;
                            setCombineRules(newRules);
                        }} required />
                        <label htmlFor={`operator${index + 1}`}>Operator:</label>
                        <select id={`operator${index + 1}`} value={rule.operator} onChange={(e) => {
                            const newRules = [...combineRules];
                            newRules[index].operator = e.target.value;
                            setCombineRules(newRules);
                        }}>
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                        </select>
                    </div>
                ))}
                <button type="button" onClick={handleAddRule}>Add Another Rule</button>
                <button type="submit">Combine Rules</button>
            </form>
            <pre id="combine-rules-result"></pre>

            <h2>Evaluate Rule</h2>
            <form onSubmit={handleEvaluateRule}>
                <div>
                    <label htmlFor="evaluate-ast">Rule Name:</label>
                    <input type="text" id="evaluate-ast" value={ast} onChange={(e) => setAST(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="evaluate-data">Data JSON:</label>
                    <textarea id="evaluate-data" value={data} onChange={(e) => setData(e.target.value)} required />
                </div>
                <button type="submit">Evaluate Rule</button>
            </form>
            {result && <pre id="evaluate-rule-result">{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
};

export default RuleEngine;
