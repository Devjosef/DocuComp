import React, { useEffect, useState } from 'react';
import { fetchDocumentVersions, createBranch, mergeBranches, visualizeVersionHistory } from '../../lib/versionControl';
import { archiveDocument, retrieveArchivedDocument } from '../../lib/documentArchiving';
import { checkCompliance } from '../../lib/complianceTracking';
import { logUserAction, generateUsageReport } from '../../lib/analyticsReporting';
import DocumentTagging from '../../lib/documentTagging';

const Dashboard: React.FC = () => {
    const [documentId, setDocumentId] = useState<number>(1); // Example document ID
    const [versions, setVersions] = useState([]);
    const [versionHistory, setVersionHistory] = useState([]);
    const [complianceStatus, setComplianceStatus] = useState<boolean>(false);
    const [usageReport, setUsageReport] = useState([]);
    const [branchName, setBranchName] = useState<string>('');
    const [sourceBranch, setSourceBranch] = useState<string>('');
    const [targetBranch, setTargetBranch] = useState<string>('');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const versionsData = await fetchDocumentVersions(documentId, 1, 10);
                setVersions(versionsData);

                const compliance = await checkCompliance(documentId);
                setComplianceStatus(compliance);

                const report = await generateUsageReport();
                setUsageReport(report as never[]);

                const history = await visualizeVersionHistory(documentId);
                setVersionHistory(history as never[]);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };

        fetchInitialData();
    }, [documentId]);

    const handleArchiveDocument = async () => {
        try {
            await archiveDocument(documentId);
            alert('Document archived successfully');
            await logUserAction(1, 'Archived Document'); // Example userId
        } catch (error) {
            console.error('Error archiving document:', error);
        }
    };

    const handleRetrieveArchivedDocument = async () => {
        try {
            const data = await retrieveArchivedDocument(documentId);
            console.log('Archived document retrieved:', data);
            await logUserAction(1, 'Retrieved Archived Document'); // Example userId
        } catch (error) {
            console.error('Error retrieving archived document:', error);
        }
    };

    const handleCreateBranch = async () => {
        try {
            await createBranch(documentId, branchName);
            alert('Branch created successfully');
            await logUserAction(1, 'Created Branch'); // Example userId
        } catch (error) {
            console.error('Error creating branch:', error);
        }
    };

    const handleMergeBranches = async () => {
        try {
            await mergeBranches(documentId, sourceBranch, targetBranch);
            alert('Branches merged successfully');
            await logUserAction(1, 'Merged Branches'); // Example userId
        } catch (error) {
            console.error('Error merging branches:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">DocuComp Dashboard</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Document Versions</h2>
                <ul className="list-disc pl-5">
                    {versions.map((version: { id: string; content: string }) => (
                        <li key={version.id}>{version.content}</li>
                    ))}
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Version History</h2>
                <ul className="list-disc pl-5">
                    {versionHistory.map((version: { id: string; createdAt: string; branch: string; content: string }) => (
                        <li key={version.id}>
                            {version.createdAt} - {version.branch}: {version.content}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Compliance Status</h2>
                <p>{complianceStatus ? 'Compliant' : 'Non-Compliant'}</p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Usage Report</h2>
                <ul className="list-disc pl-5">
                    {usageReport.map((report: { action: string; count: number }) => (
                        <li key={report.action}>
                            {report.action}: {report.count}
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Document Tagging</h2>
                <DocumentTagging documentId={documentId.toString()} />
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Document Actions</h2>
                <button
                    onClick={handleArchiveDocument}
                    className="bg-primary text-accent mr-2"
                >
                    Archive Document
                </button>
                <button
                    onClick={handleRetrieveArchivedDocument}
                    className="bg-secondary text-accent mr-2"
                >
                    Retrieve Archived Document
                </button>
                <button
                    onClick={handleCreateBranch}
                    className="bg-primary text-accent mr-2"
                >
                    Create Branch
                </button>
                <button
                    onClick={handleMergeBranches}
                    className="bg-secondary text-accent"
                >
                    Merge Branches
                </button>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Branch Management</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Branch Name"
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                    />
                    <button
                        onClick={handleCreateBranch}
                        className="bg-primary text-accent mt-2"
                    >
                        Create Branch
                    </button>
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        className="input input-bordered w-full max-w-xs"
                        placeholder="Source Branch"
                        value={sourceBranch}
                        onChange={(e) => setSourceBranch(e.target.value)}
                    />
                    <input
                        type="text"
                        className="input input-bordered w-full max-w-xs mt-2"
                        placeholder="Target Branch"
                        value={targetBranch}
                        onChange={(e) => setTargetBranch(e.target.value)}
                    />
                    <button
                        onClick={handleMergeBranches}
                        className="bg-secondary text-accent mt-2"
                    >
                        Merge Branches
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;