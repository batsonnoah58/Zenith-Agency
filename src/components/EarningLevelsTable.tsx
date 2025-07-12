import React from "react";
import { LEVELS } from "../data/levels";
import Tooltip from './Tooltip';
import { FaInfoCircle } from 'react-icons/fa';

const EarningLevelsTable = () => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
      <thead>
        <tr>
          <th>Level</th>
          <th>Job Bond (KES)</th>
          <th>Daily Wages (KES)</th>
          <th>Level A Fee (3%) <Tooltip text="Direct subordinates you recruited."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip></th>
          <th>Level B Fee (2%) <Tooltip text="Indirect subordinates (your subordinates' recruits)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip></th>
          <th>Level C Fee (1%) <Tooltip text="Third-level subordinates (recruited by your Level B team)."><FaInfoCircle className="inline ml-1 text-blue-400" /></Tooltip></th>
        </tr>
      </thead>
      <tbody>
        {LEVELS.map(l => (
          <tr key={l.level}>
            <td>{l.level}</td>
            <td>{l.jobBond.toLocaleString()}</td>
            <td>{l.dailyWages.toLocaleString()}</td>
            <td>{(l.dailyWages * l.managementFeeRatios.A).toFixed(2)}</td>
            <td>{(l.dailyWages * l.managementFeeRatios.B).toFixed(2)}</td>
            <td>{(l.dailyWages * l.managementFeeRatios.C).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EarningLevelsTable; 