export function formatDate(dateString) {
  if (!dateString) return 'No due date';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return 'No due date';
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'No due date';
  }
}

export default formatDate;
