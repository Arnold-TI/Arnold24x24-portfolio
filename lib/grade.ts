export const getGradeStyle = (grade: string): { display: string; color: string } => {
    const display = grade === 'X' || grade === 'XH' ? 'SS' : grade === 'SH' ? 'S' : grade;
    let color = 'text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]';
    if (grade === 'XH' || grade === 'SH') color = 'text-slate-200 drop-shadow-[0_0_5px_rgba(226,232,240,0.8)]';
    else if (grade === 'A') color = 'text-green-400';
    else if (grade === 'B') color = 'text-blue-400';
    else if (grade === 'C') color = 'text-purple-400';
    else if (grade === 'D' || grade === 'F') color = 'text-red-500';
    return { display, color };
};
