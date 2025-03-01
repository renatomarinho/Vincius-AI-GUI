import {
  PersonIcon,
  DatabaseIcon,
  GlobeIcon,
  CodeIcon,
  CodeSquareIcon,
} from '@primer/octicons-react';
import BrainIcon from './BrainIcon';
import BotIcon from './BotIcon';

export const initialNodes = [
  {
    id: '1',
    type: 'customNode',
    data: { 
      label: 'User Input',
      description: 'Receives user queries and requests',
      icon: <PersonIcon size={16} />
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'customNode',
    data: { 
      label: 'Text Processing',
      description: 'Cleans and normalizes input text',
      icon: <CodeIcon size={16} />
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '3',
    type: 'customNode',
    data: { 
      label: 'NLP Analysis',
      description: 'Extracts entities and context',
      icon: <CodeSquareIcon size={16} />
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '4',
    type: 'customNode',
    data: { 
      label: 'Intent Recognition',
      description: 'Determines user intent and goals',
      icon: <BrainIcon size={16} />
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '5',
    type: 'customNode',
    data: { 
      label: 'Knowledge Base',
      description: 'Retrieves relevant information',
      icon: <DatabaseIcon size={16} />
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '6',
    type: 'customNode',
    data: { 
      label: 'External API',
      description: 'Fetches data from external services',
      icon: <GlobeIcon size={16} />
    },
    position: { x: 0, y: 0 },
  },
  {
    id: '7',
    type: 'customNode',
    data: { 
      label: 'Response Generation',
      description: 'Creates tailored responses for user',
      icon: <BotIcon size={16} />
    },
    position: { x: 0, y: 0 },
  },
];

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'e4-6',
    source: '4',
    target: '6',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    animated: true,
    type: 'smoothstep',
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    animated: true,
    type: 'smoothstep',
  },
];
