import React from 'react';

const Recommendation = ({ recommendation }) => {
  const h3Class = 'font-semibold text-zinc-200 text-lg indent-2';
  const pClass = 'text-zinc-200 indent-2 my-2';
  const labelClass = 'ml-6 text-zinc-400';
  const labelClass2 = 'ml-2 text-zinc-400';

  return (
    <div className='p-4 bg-blue-950 rounded-lg shadow'>
      <h3 className={h3Class}>Cluster ID: {recommendation.clusterID}</h3>
      <p className={pClass}>
        Namespace:{' '}
        <label className={labelClass2}>{recommendation.namespace}</label>
      </p>
      <p className={pClass}>
        Controller Kind:{' '}
        <label className={labelClass2}>{recommendation.controllerKind}</label>
      </p>
      <p className={pClass}>
        Controller Name:{' '}
        <label className={labelClass2}>{recommendation.controllerName}</label>
      </p>
      {/* {/* <p>Container Name: {recommendation.containerName}</p> */}
      <p className={pClass}>
        Recommended Request:
        <div>
          <label className={labelClass}>
            cpu: {recommendation.recommendedRequest.cpu}
          </label>
        </div>
        <div>
          <label className={labelClass}>
            memory: {recommendation.recommendedRequest.memory}
          </label>
        </div>
      </p>
      <p className={pClass}>
        Monthly Savings:
        <div>
          <label className={labelClass}>
            memory: {recommendation.monthlySavings.memory}
          </label>
        </div>
        <div>
          <label className={labelClass}>
            total: {recommendation.monthlySavings.total}
          </label>
        </div>
      </p>
      <p className={pClass}>
        Latest Known Request:
        <div>
          <label className={labelClass}>
            cpu: {recommendation.latestKnownRequest.cpu}
          </label>
        </div>
        <div>
          <label className={labelClass}>
            memory: {recommendation.latestKnownRequest.memory}
          </label>
        </div>
      </p>
      <p className={pClass}>
        Current Efficiency:
        <div>
          <label className={labelClass}>
            cpu: {recommendation.currentEfficiency.cpu}
          </label>
        </div>
        <div>
          <label className={labelClass}>
            memory: {recommendation.currentEfficiency.memory}
          </label>
        </div>
        <div>
          <label className={labelClass}>
            total: {recommendation.currentEfficiency.total}
          </label>
        </div>
      </p>
      <p className={pClass}>
        Average Usage:
        <div>
          <label className={labelClass}>
            cpu: {recommendation.averageUsage.cpu}
          </label>
        </div>
        <div>
          <label className={labelClass}>
            memory: {recommendation.averageUsage.memory}
          </label>
        </div>
      </p>
      <p className={pClass}>
        Max Usage:
        <div>
          <label className={labelClass}>
            cpu: {recommendation.maxUsage.cpu}
          </label>
        </div>
        <div>
          <label className={labelClass}>
            memory: {recommendation.maxUsage.memory}
          </label>
        </div>
      </p>
    </div>
  );
};

export default Recommendation;
