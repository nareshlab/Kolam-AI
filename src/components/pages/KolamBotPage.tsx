import React from 'react';
import ScrollFixKolamBot from './ScrollFixKolamBot';

interface KolamBotPageProps {
  username?: string;
}

const KolamBotPage: React.FC<KolamBotPageProps> = ({ username }) => {
  return <ScrollFixKolamBot username={username} />;
};

export default KolamBotPage;