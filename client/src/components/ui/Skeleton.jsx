export function TaskSkeleton() {
  return (
    <div
      style={{
        background: '#0D1325',
        border: '1px solid rgba(103, 132, 255, 0.12)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '12px',
        animation: 'pulse 1.8s ease-in-out infinite',
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1 }}>
        <div
          style={{
            height: '16px',
            width: '35%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '4px',
            marginBottom: '8px',
          }}
        />
        <div
          style={{
            height: '12px',
            width: '60%',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '4px',
          }}
        />
      </div>
      <div
        style={{
          height: '24px',
          width: '80px',
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}
      />
      <div
        style={{
          height: '14px',
          width: '75px',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}
      />
    </div>
  );
}

export function SkeletonList({ count = 4 }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <TaskSkeleton key={i} />
      ))}
    </div>
  );
}

export default TaskSkeleton;
