import { Mainmenu } from './mainmenu';

export const MAINMENUES: Mainmenu[] = [
    {
        id: 100,
        name: 'Table Test',
        route: '/test',
        description: 'テスト説明文',
        sortNum: 10,
        color: 'rgba(124,22,65,0.7)',
        icon: 'grid_on'
    },
    {
        id: 101,
        name: 'File Generator',
        route: '/file-generator',
        description: 'テスト説明文',
        sortNum: 11,
        color: 'rgba(22,124,65,0.7)',
        icon: 'content_copy'
    },
    {
        id: 102,
        name: 'test2',
        route: 'aaa',
        description: 'テスト説明文',
        sortNum: 12,
        color: 'rgba(65,22,124,0.7)',
        icon: 'add'
    },
    {
        id: 103,
        name: 'test3',
        route: 'aaa',
        description: 'テスト説明文',
        sortNum: 13,
        color: 'rgba(124,65,22,0.7)',
        icon: 'add'
    },
    {
        id: 104,
        name: 'test4',
        route: 'aaa',
        description:
        'テスト説明文',
        sortNum: 14,
        color: 'rgba(65,124,22,0.7)',
        icon: 'add'
    }
];
