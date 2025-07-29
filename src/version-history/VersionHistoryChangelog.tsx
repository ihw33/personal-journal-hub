import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronRight, 
  Calendar, 
  User, 
  FileText, 
  Plus, 
  Minus, 
  Edit,
  GitBranch,
  Clock
} from 'lucide-react';
import { useState } from 'react';
import { VersionGroup, VersionChangeLog, FileChange } from './types';
import { getVersionTypeConfig, getImpactConfig } from './data';

interface VersionHistoryChangelogProps {
  language: 'ko' | 'en';
  versionGroups: VersionGroup[];
}

export function VersionHistoryChangelog({ language, versionGroups }: VersionHistoryChangelogProps) {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['v125']) // v125 그룹은 기본으로 열림
  );
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(
    new Set(['v125.1']) // 최신 버전은 기본으로 열림
  );

  const content = {
    ko: {
      changelogTitle: '상세 변경 로그',
      changelogSubtitle: '각 버전별 구체적인 변경사항 및 파일 수정 내역',
      releaseDate: '릴리즈 날짜',
      author: '작성자',
      changes: '주요 변경사항',
      files: '수정된 파일',
      impact: '영향도',
      noBreaking: '호환성 유지',
      breaking: '호환성 변경',
      fileAdded: '추가됨',
      fileModified: '수정됨',
      fileRemoved: '삭제됨'
    },
    en: {
      changelogTitle: 'Detailed Changelog',
      changelogSubtitle: 'Specific changes and file modifications for each version',
      releaseDate: 'Release Date',
      author: 'Author',
      changes: 'Key Changes',
      files: 'Modified Files',
      impact: 'Impact',
      noBreaking: 'No Breaking Changes',
      breaking: 'Breaking Changes',
      fileAdded: 'Added',
      fileModified: 'Modified',
      fileRemoved: 'Removed'
    }
  };

  const t = content[language];

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleVersion = (versionId: string) => {
    const newExpanded = new Set(expandedVersions);
    if (newExpanded.has(versionId)) {
      newExpanded.delete(versionId);
    } else {
      newExpanded.add(versionId);
    }
    setExpandedVersions(newExpanded);
  };

  const getFileChangeIcon = (type: FileChange['type']) => {
    switch (type) {
      case 'added':
        return <Plus className="w-3 h-3 text-green-600" />;
      case 'modified':
        return <Edit className="w-3 h-3 text-blue-600" />;
      case 'removed':
        return <Minus className="w-3 h-3 text-red-600" />;
      default:
        return <FileText className="w-3 h-3 text-gray-600" />;
    }
  };

  const getFileChangeColor = (type: FileChange['type']) => {
    switch (type) {
      case 'added':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'modified':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'removed':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getFileChangeLabel = (type: FileChange['type']) => {
    switch (type) {
      case 'added':
        return t.fileAdded;
      case 'modified':
        return t.fileModified;
      case 'removed':
        return t.fileRemoved;
      default:
        return type;
    }
  };

  const renderVersionDetails = (version: VersionChangeLog) => {
    const typeConfig = getVersionTypeConfig(version.type);
    const impactConfig = getImpactConfig(version.impact);
    const isExpanded = expandedVersions.has(version.version);

    return (
      <Card key={version.version} className="border-l-4 border-l-iwl-purple">
        <Collapsible open={isExpanded} onOpenChange={() => toggleVersion(version.version)}>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                  <div className="text-left">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Badge className={typeConfig.color}>
                        {typeConfig.icon}
                        {version.version}
                      </Badge>
                      <span className="text-gray-900">{version.title}</span>
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{version.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={impactConfig.color + ' bg-transparent border'}>
                    {impactConfig.icon}
                    {impactConfig.label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {version.date}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 메타 정보 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    <span>{t.author}: {version.author}</span>
                  </div>
                  
                  {version.breaking && (
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <GitBranch className="w-4 h-4" />
                      <span>{t.breaking}</span>
                    </div>
                  )}

                  {/* 주요 변경사항 */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">{t.changes}</h4>
                    <ul className="space-y-1">
                      {version.changes.map((change, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-iwl-purple rounded-full mt-2 flex-shrink-0"></div>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 파일 변경사항 */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t.files}</h4>
                  <div className="space-y-2">
                    {version.files.map((file, index) => (
                      <div key={index} className={`p-2 rounded-lg border ${getFileChangeColor(file.type)}`}>
                        <div className="flex items-center gap-2 mb-1">
                          {getFileChangeIcon(file.type)}
                          <code className="text-xs font-mono">{file.file}</code>
                          <Badge variant="outline" className="text-xs">
                            {getFileChangeLabel(file.type)}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 ml-5">{file.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  };

  const renderVersionGroup = (group: VersionGroup) => {
    const isExpanded = expandedGroups.has(group.majorVersion);
    
    return (
      <div key={group.majorVersion} className="mb-8">
        <Collapsible open={isExpanded} onOpenChange={() => toggleGroup(group.majorVersion)}>
          <CollapsibleTrigger className="w-full">
            <Card className={`border-2 ${group.status === 'current' ? 'border-iwl-purple bg-iwl-purple-50' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    )}
                    <div className="text-left">
                      <CardTitle className="flex items-center gap-2">
                        <GitBranch className="w-5 h-5 text-iwl-purple" />
                        <span className="text-xl">{group.majorVersion}</span>
                        <span className="text-gray-700">- {group.title}</span>
                      </CardTitle>
                      <div className="flex items-center gap-4 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {group.period}
                        </Badge>
                        <Badge className={group.status === 'current' ? 'bg-iwl-gradient text-white' : 'bg-green-100 text-green-700'}>
                          {group.status === 'current' ? 'Current' : 'Completed'}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {group.versions.length} versions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </CollapsibleTrigger>
          
          <CollapsibleContent>
            <div className="mt-4 space-y-4 ml-6">
              {group.versions.map(version => renderVersionDetails(version))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    );
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FileText className="w-6 h-6 text-iwl-purple" />
          {t.changelogTitle}
        </h2>
        <p className="text-gray-600">{t.changelogSubtitle}</p>
      </div>
      
      <div className="space-y-6">
        {versionGroups.map(group => renderVersionGroup(group))}
      </div>
    </div>
  );
}